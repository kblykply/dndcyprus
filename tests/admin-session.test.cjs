const test = require("node:test");
const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");
const { NextRequest } = require("next/server");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const NOW = 1_800_000_000_000;
const SECRET = "local-test-session-secret-not-a-production-credential";
const ENV = {
  NODE_ENV: "production",
  ADMIN_USER: "test-admin",
  ADMIN_PASSWORD: "test-password-not-a-real-credential",
  ADMIN_SESSION_SECRET: SECRET,
};
class TestDate extends Date {
  static now() { return NOW; }
}
const globals = { Date: TestDate };
const session = (env = ENV) => loadTypeScript("lib/admin-session.ts", { env, globals });

function signedToken(expires, secret = SECRET) {
  return `${expires}.${createHmac("sha256", secret).update(`admin:${expires}`).digest("hex")}`;
}

test("session creation produces an independently verifiable eight-hour HMAC token", async () => {
  const auth = session();
  const token = await auth.createAdminSession();
  assert.equal(auth.ADMIN_SESSION_MAX_AGE, 8 * 60 * 60);
  assert.equal(token, signedToken(NOW + 8 * 60 * 60 * 1000));
  assert.equal(await auth.verifyAdminSession(token), true);
});

test("missing, manually forged, malformed and tampered sessions are rejected", async () => {
  const auth = session();
  const valid = signedToken(NOW + 60_000);
  const [expires, signature] = valid.split(".");
  for (const token of [
    undefined, null, "", "1", "true", "admin", "NaN.deadbeef", "Infinity.deadbeef",
    `${expires}.${"0".repeat(64)}`,
    `${Number(expires) + 1}.${signature}`,
    `${expires}.${signature.slice(0, -1)}`,
    `${expires}.${signature.toUpperCase()}`,
    `${valid}.ignored-suffix`,
    `${valid}\n`,
    ` ${valid}`,
    `0${valid}`,
    signedToken(Number.MAX_SAFE_INTEGER + 1),
  ]) {
    assert.equal(await auth.verifyAdminSession(token), false, `must reject ${token}`);
  }
});

test("a session expires exactly at its signed deadline", async () => {
  const auth = session();
  assert.equal(await auth.verifyAdminSession(signedToken(NOW - 1)), false);
  assert.equal(await auth.verifyAdminSession(signedToken(NOW)), false);
  assert.equal(await auth.verifyAdminSession(signedToken(NOW + 1)), true);
});

test("missing configuration fails closed and secret rotation invalidates previous tokens", async () => {
  const token = await session().createAdminSession();
  assert.equal(await session({}).createAdminSession(), null);
  assert.equal(await session({}).verifyAdminSession(token), false);
  assert.equal(await session({ ADMIN_USER: "test-admin" }).createAdminSession(), null);
  const rotated = session({ ...ENV, ADMIN_SESSION_SECRET: `${SECRET}-rotated` });
  assert.equal(await rotated.verifyAdminSession(token), false);
  assert.equal(await rotated.verifyAdminSession(await rotated.createAdminSession()), true);
});

test("credential fallback remains signed and changing fallback credentials invalidates it", async () => {
  const fallbackEnv = { ADMIN_USER: "fallback-user", ADMIN_PASSWORD: "fallback-test-password" };
  const auth = session(fallbackEnv);
  const token = await auth.createAdminSession();
  assert.equal(token, signedToken(NOW + 8 * 60 * 60 * 1000, "dnd-admin:fallback-user:fallback-test-password"));
  assert.equal(await auth.verifyAdminSession(token), true);
  assert.equal(await session({ ...fallbackEnv, ADMIN_PASSWORD: "rotated-test-password" }).verifyAdminSession(token), false);
  assert.equal(await session().verifyAdminSession(token), false);
});

test("login return targets stay within the normalized admin path", () => {
  const { safeAdminNext } = session();
  for (const target of [
    undefined, null, "", "/tr", "https://example.test/admin", "//example.test/admin",
    "/administrator", "/administer/leads", "/admin/../tr", "/admin/%2e%2e/tr",
    "/admin/..%2ftr", "/admin/%5c..%5ctr", "/admin\\..\\tr",
    "/admin/login", "/admin/login?error=1", "/admin/login/extra",
    "/admin\n/../tr",
  ]) {
    assert.equal(safeAdminNext(target), "/admin/leads", `must reject ${target}`);
  }
  assert.equal(safeAdminNext("/admin"), "/admin");
  assert.equal(safeAdminNext("/admin/leads?source=test#latest"), "/admin/leads?source=test#latest");
  assert.equal(safeAdminNext("/admin/example/../leads"), "/admin/leads");
});

function loginRequest(fields) {
  return new NextRequest("https://local.test/api/admin-login", {
    method: "POST",
    body: new URLSearchParams(fields),
  });
}

test("valid login issues a signed production cookie with the required security flags", async () => {
  const { POST } = loadTypeScript("app/api/admin-login/route.ts", { env: ENV, globals });
  const response = await POST(loginRequest({
    username: ENV.ADMIN_USER, password: ENV.ADMIN_PASSWORD, next: "/admin/leads?source=test",
  }));
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("location"), "https://local.test/admin/leads?source=test");
  const cookie = response.cookies.get("admin_session");
  assert.equal(await session().verifyAdminSession(cookie.value), true);
  assert.equal(cookie.httpOnly, true);
  assert.equal(cookie.secure, true);
  assert.equal(cookie.sameSite, "strict");
  assert.equal(cookie.path, "/");
  assert.equal(cookie.maxAge, 8 * 60 * 60);
});

test("login sanitizes unsafe return targets even when credentials are valid", async () => {
  const { POST } = loadTypeScript("app/api/admin-login/route.ts", { env: ENV, globals });
  const response = await POST(loginRequest({
    username: ENV.ADMIN_USER, password: ENV.ADMIN_PASSWORD, next: "/admin/../tr",
  }));
  assert.equal(response.headers.get("location"), "https://local.test/admin/leads");
});

test("wrong or absent configured credentials issue no session and keep the retry delay", async () => {
  for (const env of [ENV, {}]) {
    const delays = [];
    const { POST } = loadTypeScript("app/api/admin-login/route.ts", {
      env,
      globals: { ...globals, setTimeout: (resolve, delay) => { delays.push(delay); resolve(); } },
    });
    const response = await POST(loginRequest({ username: ENV.ADMIN_USER, password: "wrong", next: "//example.test" }));
    assert.equal(response.status, 303);
    assert.equal(response.cookies.get("admin_session"), undefined);
    const target = new URL(response.headers.get("location"));
    assert.equal(target.pathname, "/admin/login");
    assert.equal(target.searchParams.get("error"), "1");
    assert.equal(target.searchParams.get("next"), "/admin/leads");
    assert.deepEqual(delays, [800]);
  }
});

test("middleware blocks missing, forged, expired and tampered cookies and clears them", async () => {
  const { middleware } = loadTypeScript("middleware.ts", { env: ENV, globals });
  for (const token of [undefined, "1", signedToken(NOW - 1), `${NOW + 60_000}.${"0".repeat(64)}`]) {
    const request = new NextRequest("https://local.test/admin/leads", {
      headers: token ? { cookie: `admin_session=${token}` } : {},
    });
    const response = await middleware(request);
    assert.equal(response.status, 307);
    const target = new URL(response.headers.get("location"));
    assert.equal(target.pathname, "/admin/login");
    assert.equal(target.searchParams.get("next"), "/admin/leads");
    assert.equal(response.cookies.get("admin_session").value, "");
  }
});

test("middleware accepts signed sessions and skips the login form for authenticated admins", async () => {
  const { middleware } = loadTypeScript("middleware.ts", { env: ENV, globals });
  const headers = { cookie: `admin_session=${signedToken(NOW + 60_000)}` };
  const allowed = await middleware(new NextRequest("https://local.test/admin/leads", { headers }));
  assert.equal(allowed.headers.get("x-middleware-next"), "1");
  const login = await middleware(new NextRequest("https://local.test/admin/login?next=/tr", { headers }));
  assert.equal(login.headers.get("location"), "https://local.test/admin/leads");
});

test("leads page checks the signature before querying any customer data", async () => {
  let queries = 0;
  const denied = new Error("test redirect");
  for (const token of [undefined, "1", signedToken(NOW - 1)]) {
    const { default: AdminLeadsPage } = loadTypeScript("app/(default)/admin/leads/page.tsx", {
      env: ENV,
      globals,
      mocks: {
        "next/headers": { cookies: async () => ({ get: () => token ? { value: token } : undefined }) },
        "next/navigation": { redirect: (target) => { assert.equal(target, "/admin/login?next=/admin/leads"); throw denied; } },
        "@/lib/prisma": { prisma: { contactMessage: { findMany: async () => { queries++; return []; } } } },
      },
    });
    await assert.rejects(AdminLeadsPage(), error => error === denied);
  }
  assert.equal(queries, 0);
});

test("leads page permits a signed session and reads only the mocked database", async () => {
  let queries = 0;
  const { default: AdminLeadsPage } = loadTypeScript("app/(default)/admin/leads/page.tsx", {
    env: ENV,
    globals,
    mocks: {
      "next/headers": { cookies: async () => ({ get: () => ({ value: signedToken(NOW + 60_000) }) }) },
      "next/navigation": { redirect: () => { throw new Error("unexpected redirect"); } },
      "@/lib/prisma": { prisma: { contactMessage: { findMany: async () => { queries++; return []; } } } },
    },
  });
  assert.ok(await AdminLeadsPage());
  assert.equal(queries, 1);
});
