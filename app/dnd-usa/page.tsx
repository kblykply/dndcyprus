import DndUsaHero from "../components/dnd-usa/DndUsaHero";
import DndUsaWhoWeAre from "../components/dnd-usa/DndUsaWhoWeAre";  
import DndUsaServices from "../components/dnd-usa/DndUsaServices";
import DndUsaVision from "../components/dnd-usa/DndUsaVision";
import DndUsaAchievements from "../components/dnd-usa/DndUsaAchievements";
import DndUsaMedia from "../components/dnd-usa/DndUsaMedia";
import DndUsaTestimonials from "../components/dnd-usa/DndUsaTestimonials";
import DndUsaProjects from "../components/dnd-usa/DndUsaProjects";
import DndUsaForSale from "../components/dnd-usa/DndUsaForSale";
import DndUsaProcess from "../components/dnd-usa/DndUsaProcess";
import DndUsaSustainability from "../components/dnd-usa/DndUsaSustainability";
import DndUsaStrengths from "../components/dnd-usa/DndUsaStrengths";
import DndUsaPress from "../components/dnd-usa/DndUsaPress";
import DndUsaCTA from "../components/dnd-usa/DndUsaCTA";
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">

      <DndUsaHero />
      <DndUsaWhoWeAre />
      <DndUsaServices />
       <DndUsaProjects />
      <DndUsaProcess />
      <DndUsaSustainability/>
      <DndUsaVision />
      <DndUsaMedia />
      <DndUsaStrengths />
      <DndUsaPress />
      
      <DndUsaCTA />
      
      

    </main>
  );
}

    
