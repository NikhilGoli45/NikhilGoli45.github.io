import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
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
  const navigationType = useNavigationType();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const savedY = sessionStorage.getItem("projectsScrollY");

    // On POP with a saved carousel position, restore it — this takes priority
    // over hash-based scroll (handles both "/" and "/#projects" back targets)
    if (navigationType === "POP" && savedY !== null) {
      sessionStorage.removeItem("projectsScrollY");

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const needsPin = isDesktop && !reducedMotion;

      const restoreScroll = (retries = 0) => {
        const st = ScrollTrigger.getById("projects-pin");
        const pinReady = !needsPin || !!st;

        if (!pinReady && retries < 24) {
          requestAnimationFrame(() => restoreScroll(retries + 1));
          return;
        }

        const y = Number(savedY);

        // Directly set the animation's progress so the scrub tween has
        // nothing to animate (bypasses the 1-second scrub lag)
        if (st?.animation) {
          const range = st.end - st.start;
          const progress = range > 0 ? Math.max(0, Math.min(1, (y - st.start) / range)) : 0;
          st.animation.progress(progress, true);
        }

        window.scrollTo({ top: y, behavior: "instant" });
      };

      requestAnimationFrame(() => restoreScroll());
      return;
    }

    if (hash) {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
          scrollToSection(hash);
        });
      });
    }
  }, [location, navigationType]);

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
