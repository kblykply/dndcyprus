// cam satırın (.glassrow) ok düğmesi: "→" karakteri yerine karuseldeki okla aynı ince çizgili ok
export default function GlassArrow() {
  return (
    <i aria-hidden>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </i>
  );
}
