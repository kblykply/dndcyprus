// app/(default)/admin/loading.tsx
// Panel sayfaları arasında geçişte menü yerinde kalır, içerik alanında hemen iskelet görünür (sunucu cevabı beklenirken boş ekran yok).
export default function AdminLoading() {
  const bar = "animate-pulse rounded-lg bg-slate-200/70";
  return (
    <div className="mx-auto max-w-[1600px]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Yükleniyor…</span>
      <div className={`${bar} h-9 w-64`} />
      <div className={`${bar} mt-3 h-4 w-96 max-w-full`} />
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className={`${bar} h-3 w-24`} />
            <div className={`${bar} mt-3 h-8 w-16`} />
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${bar} mt-3 h-10 w-full first:mt-0`} />
        ))}
      </div>
    </div>
  );
}
