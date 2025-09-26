import UnitsSection from "../components/units/UnitsSection";
import UnitsHero from "../components/units/UnitsHero";
import UnitsCTA from "../components/units/UnitsCTA";
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

<UnitsHero />
<UnitsSection />
<UnitsCTA />
    </main>
  );
}
