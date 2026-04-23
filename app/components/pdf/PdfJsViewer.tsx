"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

type Props = {
  file: string;
};

export default function PdfJsViewer({ file }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function renderPdf() {
      const container = containerRef.current;
      if (!container) return;

      setLoading(true);
      setError("");
      setNumPages(0);
      container.innerHTML = "";

      try {
        const loadingTask = pdfjsLib.getDocument(file);
        const pdf = await loadingTask.promise;

        if (cancelled) return;

        setNumPages(pdf.numPages);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          if (cancelled) return;

          const viewport = page.getViewport({ scale });

          const pageWrap = document.createElement("div");
          pageWrap.style.margin = "0 0 24px";
          pageWrap.style.display = "flex";
          pageWrap.style.justifyContent = "center";

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Canvas context could not be created.");
          }

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.maxWidth = `${Math.floor(viewport.width)}px`;
          canvas.style.borderRadius = "18px";
          canvas.style.boxShadow = "0 12px 40px rgba(20,21,23,0.08)";
          canvas.style.background = "#fff";

          pageWrap.appendChild(canvas);
          container.appendChild(pageWrap);

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
  }, [file, scale]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e7ecef] bg-white px-4 py-3">
        <div className="text-sm text-[#141517B3]">
          {loading ? "Loading PDF..." : `${numPages} page${numPages === 1 ? "" : "s"}`}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.8, +(s - 0.2).toFixed(2)))}
            className="rounded-full border border-[#dfe6ea] px-3 py-1.5 text-sm text-[#141517] hover:bg-[#f7f9fa]"
          >
            Zoom Out
          </button>

          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.4, +(s + 0.2).toFixed(2)))}
            className="rounded-full border border-[#dfe6ea] px-3 py-1.5 text-sm text-[#141517] hover:bg-[#f7f9fa]"
          >
            Zoom In
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
        className="max-h-[75vh] overflow-y-auto rounded-[24px] bg-[#f6f8f9] p-3 sm:p-4"
      />

      {loading && !error ? (
        <div className="mt-4 text-sm text-[#14151799]">Rendering pages...</div>
      ) : null}
    </div>
  );
}