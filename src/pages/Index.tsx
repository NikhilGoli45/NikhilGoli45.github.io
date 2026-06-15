import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { scrollToSection } from "@/utils/scrollToSection";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        scrollToSection(hash);
      });
    });
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
