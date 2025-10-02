import Perla2Hero from "../components/perla-ii/Perla2Hero";
import Perla2Facts from "../components/perla-ii/Perla2Facts";
import Perla2Overview from "../components/perla-ii/Perla2Overview";
import Perla2Gallery from "../components/perla-ii/Perla2Gallery";
import Perla2FloorPlans from "../components/projects/Perla2FloorPlans";
import Perla2Amenities from "../components/projects/Perla2Amenities";
import Perla2Location from "../components/projects/Perla2Location";
import Perla2Timeline from "../components/perla-ii/Perla2Timeline";
import Perla2CTA from "../components/perla-ii/Perla2CTA";
import Hotspots from "../components/perla-ii/Hotspots";
import Charts from "../components/perla-ii/Charts";



export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">
<Perla2Hero />
<Perla2Overview />
<Perla2Facts />

<Perla2Gallery /> 

<Hotspots/>



<Perla2FloorPlans />
<Charts />

<Perla2Amenities />
<Perla2Location />
<Perla2Timeline />
<Perla2CTA />
    </main>
  );
}
