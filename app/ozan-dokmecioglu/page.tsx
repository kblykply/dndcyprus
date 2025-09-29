import OzanHero from "../components/ozan/OzanHero";
import OzanBio from "../components/ozan/OzanBio";
import OzanJourney from "../components/ozan/OzanJourney";
import OzanVision from "../components/ozan/OzanVision";
import OzanAchievements from "../components/ozan/OzanAchievements";
import OzanMedia from "../components/ozan/OzanMedia";
import OzanPersonal from "../components/ozan/OzanPersonal";
import OzanGallery from "../components/ozan/OzanGallery";
import OzanTestimonials from "../components/ozan/OzanTestimonials";
import OzanCTA from "../components/ozan/OzanCTA";
export default function HomePage() {
  return (
    <main className="bg-white relative w-full min-h-screen text-white overflow-x-hidden">


      
      <OzanHero />
      <OzanBio />
      <OzanJourney />
      <OzanVision />
      <OzanAchievements />
          <OzanMedia
        featuredVideo={{
          src: "https://www.youtube.com/embed/1_kNqfyK-f8?si=bH-wpcqi52HSPsap",
          kind: "youtube",
          poster: "/images/media/featured-poster.jpg",
        }}
      />
      <OzanCTA /> 
    </main>
  );
}
