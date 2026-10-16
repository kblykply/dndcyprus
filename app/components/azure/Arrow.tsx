// sitenin tek ok çizimi (karusel okuyla aynı): düğme yazısının yanında, gezinme düğmelerinde ve cam çemberde.
// "→" / "←" karakterleri yazı tipine göre ince ve uzun görünüyordu; hepsi bu çizimle değişti.
export default function Arrow({ dir = 1, size = "1.15em" }: { dir?: 1 | -1; size?: number | string }) {
  return (
    <svg className={dir < 0 ? "az-arrow back" : "az-arrow"} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
