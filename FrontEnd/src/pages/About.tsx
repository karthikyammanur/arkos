import Footer from "../components/About/Footer"; //Reue same one as landig main
import Navbar from "../components/About/NavBar";
import HeroSection from "../components/About/Hero";
import TeamSection from "../components/About/TeamSection";
import HackathonSection from "../components/About/HackathonSection";
import TechnologySection from "../components/About/TechnologySection";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <HeroSection />
      <TeamSection />
      <HackathonSection />
      <TechnologySection />
      <Footer />
    </div>
  );
}



