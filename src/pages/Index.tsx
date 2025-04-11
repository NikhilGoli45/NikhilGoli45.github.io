
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/utils/useScrollAnimation";

const Index = () => {
  // Use the custom hook for scroll animations
  useScrollAnimation();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <HeroSection />
      <div className="animate-on-scroll scroll-animation" style={{ transform: 'translateY(30px)' }}>
        <AboutSection />
      </div>
      <div className="animate-on-scroll scroll-animation" style={{ transform: 'translateY(30px)' }}>
        <EducationSection />
      </div>
      <div className="animate-on-scroll scroll-animation" style={{ transform: 'translateY(30px)' }}>
        <ExperienceSection />
      </div>
      <div className="animate-on-scroll scroll-animation" style={{ transform: 'translateY(30px)' }}>
        <ProjectsSection />
      </div>
      <div className="animate-on-scroll scroll-animation" style={{ transform: 'translateY(30px)' }}>
        <SkillsSection />
      </div>
      <div className="animate-on-scroll scroll-animation" style={{ transform: 'translateY(30px)' }}>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
