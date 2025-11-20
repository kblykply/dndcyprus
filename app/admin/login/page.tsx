// app/admin/login/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Giriş | DND Cyprus",
};

type SearchParams = {
  error?: string;
  next?: string;
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  // Promise olan searchParams'i çöz
  const params = (await searchParams) ?? {};
  const hasError = params.error === "1";
  const nextPath = params.next || "/admin/leads";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-slate-200 p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            DND CYPRUS
          </p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Admin Giriş
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Yönetim paneline erişmek için kullanıcı adı ve şifrenizi girin.
          </p>
        </div>

        {hasError && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            Kullanıcı adı veya şifre hatalı.
          </div>
        )}

        <form method="POST" action="/api/admin-login" className="space-y-4">
          <input type="hidden" name="next" value={nextPath} />

          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium text-slate-700"
            >
              Kullanıcı Adı
            </label>
            <input
              id="username"
              name="username"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-700"
            >
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
