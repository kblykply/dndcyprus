import Arrow from "./Arrow";

// ortak cam satırın (.az-glassrow, app/azure.css) ok düğmesi: cam çember içinde sitenin ok çizimi
export default function GlassArrow() {
  return (
    <i aria-hidden>
      <Arrow size={16} />
    </i>
  );
}
