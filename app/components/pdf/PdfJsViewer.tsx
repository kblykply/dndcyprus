"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  file: string;
};

export default function PdfJsViewer({ file }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pagesRef = useRef<HTMLDivElement | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [renderScale] = useState(1.1);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function renderPdf() {
      if (typeof window === "undefined") return;

      const pagesEl = pagesRef.current;
      if (!pagesEl) return;

      setLoading(true);
      setError("");
      setNumPages(0);
      pagesEl.innerHTML = "";

      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument(file);
        const pdf = await loadingTask.promise;

        if (cancelled) return;

        setNumPages(pdf.numPages);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          if (cancelled) return;

          const viewport = page.getViewport({ scale: renderScale });

          const pageWrap = document.createElement("div");
          pageWrap.style.margin = "0 auto 24px";
          pageWrap.style.width = "fit-content";

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Canvas context could not be created.");
          }

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          canvas.style.display = "block";
          canvas.style.borderRadius = "18px";
          canvas.style.boxShadow = "0 12px 40px rgba(20,21,23,0.08)";
          canvas.style.background = "#fff";

          pageWrap.appendChild(canvas);
          pagesEl.appendChild(pageWrap);

          await page.render({
            canvas,
            canvasContext: context,
            viewport,
          }).promise;
        }

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("PDF could not be loaded.");
          setLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [file, renderScale]);

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