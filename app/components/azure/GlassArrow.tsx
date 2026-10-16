import Arrow from "./Arrow";

// cam satırın (.glassrow) ok düğmesi: cam çember içinde sitenin ok çizimi
export default function GlassArrow() {
  return (
    <i aria-hidden>
      <Arrow size={16} />
    </i>
  );
}
