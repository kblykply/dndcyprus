const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

test("image upload is available with OIDC (BLOB_STORE_ID) or a read-write token, not without either", () => {
  const on = (env) => loadTypeScript("lib/content/blob.ts", { env }).blobUploadConfigured();
  assert.equal(on({}), false);
  assert.equal(on({ BLOB_STORE_ID: "  " }), false);
  assert.equal(on({ BLOB_STORE_ID: "store_abc" }), true);
  assert.equal(on({ BLOB_READ_WRITE_TOKEN: "vercel_blob_rw_x" }), true);
});
