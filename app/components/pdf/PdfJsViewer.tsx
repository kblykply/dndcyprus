"use client";

import { useEffect, useRef, useState } from "react";
import type { RenderTask } from "pdfjs-dist";

type Props = {
  file: string;
};

export default function PdfJsViewer({ file }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pagesRef = useRef<HTMLDivElement | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    let destroyDocument: (() => void) | undefined;
    const visible = new Set<HTMLElement>();
    const tasks = new Map<HTMLElement, RenderTask>();
    const pending = new Set<HTMLElement>();
    let queue = Promise.resolve();

    async function openPdf() {
      const pagesEl = pagesRef.current;
      const container = containerRef.current;
      if (!pagesEl || !container) return;
      setLoading(true);
      setError("");
      setNumPages(0);
      pagesEl.replaceChildren();
      try {
        const pdfjs = await import("pdfjs-dist");
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        const loadingTask = pdfjs.getDocument(file);
        destroyDocument = () => { void loadingTask.destroy().catch(() => {}); };
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setNumPages(pdf.numPages);
        const availableWidth = Math.max(240, container.clientWidth - 32);
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        const render = async (row: HTMLElement) => {
          if (cancelled || !visible.has(row) || row.querySelector("canvas")) return;
          const page = await pdf.getPage(Number(row.dataset.page));
          if (cancelled || !visible.has(row)) return;
          const base = page.getViewport({ scale: 1 });
          const scale = Math.min(1.1, availableWidth / base.width);
          const viewport = page.getViewport({ scale: scale * pixelRatio });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Canvas is unavailable");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          canvas.style.cssText = "display:block;width:100%;height:100%;border-radius:18px;background:white";
          row.appendChild(canvas);
          const task = page.render({ canvas, canvasContext: context, viewport });
          tasks.set(row, task);
          try { await task.promise; }
          finally { tasks.delete(row); }
        };
        const enqueue = (row: HTMLElement) => {
          if (pending.has(row)) return;
          pending.add(row);
          queue = queue.then(() => render(row)).catch((error: unknown) => {
            if (!cancelled && visible.has(row) && !(error instanceof Error && error.name === "RenderingCancelledException")) {
              setError("A PDF page could not be rendered. You can open the original file.");
            }
          }).finally(() => { pending.delete(row); });
        };
        if ("IntersectionObserver" in window) {
          observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
              const row = entry.target as HTMLElement;
              if (entry.isIntersecting) { visible.add(row); enqueue(row); }
              else {
                visible.delete(row);
                tasks.get(row)?.cancel();
                const canvas = row.querySelector("canvas");
                if (canvas) { canvas.width = 0; canvas.height = 0; canvas.remove(); }
              }
            }
          }, { root: container, rootMargin: "600px 0px" });
        }
        // Reserve page dimensions, then rasterize only pages near the viewer.
        for (let index = 1; index <= pdf.numPages; index++) {
          const page = await pdf.getPage(index);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          const width = Math.min(base.width * 1.1, availableWidth);
          const row = document.createElement("div");
          row.dataset.page = String(index);
          row.setAttribute("aria-label", `Page ${index}`);
          row.style.cssText = `margin:0 auto 24px;width:${width}px;height:${width * base.height / base.width}px;background:#fff;border-radius:18px`;
          pagesEl.appendChild(row);
          if (observer) observer.observe(row);
          else { visible.add(row); enqueue(row); }
        }
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) { setError("PDF could not be loaded."); setLoading(false); }
      }
    }
    void openPdf();
    return () => {
      cancelled = true;
      observer?.disconnect();
      for (const task of tasks.values()) task.cancel();
      for (const canvas of pagesRef.current?.querySelectorAll("canvas") ?? []) {
        canvas.width = 0;
        canvas.height = 0;
      }
      destroyDocument?.();
    };
  }, [file]);

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e7ecef] bg-white px-4 py-3">
        <div className="text-sm text-[#141517B3]">
          {loading
            ? "Loading PDF..."
            : `${numPages} page${numPages === 1 ? "" : "s"} • ${Math.round(zoom * 100)}%`}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.8, +(z - 0.2).toFixed(2)))}
            className="rounded-full border border-[#dfe6ea] px-3 py-1.5 text-sm text-[#141517] hover:bg-[#f7f9fa]"
          >
            -
          </button>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.2).toFixed(2)))}
            className="rounded-full border border-[#dfe6ea] px-3 py-1.5 text-sm text-[#141517] hover:bg-[#f7f9fa]"
          >
            +
          </button>

          <a
            href={file}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#27959b] px-4 py-1.5 text-sm text-white"
          >
            Open Original
          </a>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div
        ref={containerRef}
        className="max-h-[58vh] overflow-auto rounded-[24px] bg-[#f6f8f9] p-3 sm:p-4"
        style={{
          touchAction: "pan-x pan-y pinch-zoom",
        }}
      >
        <div
          ref={pagesRef}
          style={{
            width: "fit-content",
            margin: "0 auto",
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
          }}
        />
      </div>

      {loading && !error ? (
        <div className="mt-4 text-sm text-[#14151799]">Rendering pages...</div>
      ) : null}
    </div>
  );
}