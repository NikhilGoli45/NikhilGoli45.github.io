
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
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  // Use the custom hook for scroll animations
  useScrollAnimation();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      // Delay until after DOM is painted
      requestAnimationFrame(() => {
        const element = document.getElementById(hash);
        if (element) {
          const yOffset = -70; // Match your navbar offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    }
  }, [location]);
  
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
