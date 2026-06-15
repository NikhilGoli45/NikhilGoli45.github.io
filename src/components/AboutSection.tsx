import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";
import { useAboutScrollPin } from "@/hooks/useAboutScrollPin";

const ABOUT_STEP_COUNT = 2;

interface AboutContentProps {
  variant: "static" | "pinned";
}

const AboutContent = ({ variant }: AboutContentProps) => {
  const isPinned = variant === "pinned";
  const revealClass = isPinned ? "about-reveal-item" : "gsap-reveal";
  const reveal = (
    stepIndex: number,
    animation: "rise" | "slide-left" | "slide-right" | "fade-up-soft" | "scale-in",
    order: number
  ) =>
    isPinned
      ? {
          "data-about-step": String(stepIndex),
          "data-about-variant": animation,
          "data-about-order": String(order),
        }
      : {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      <div className="lg:col-span-7">
        <p
          className={`${revealClass} font-display text-h2 text-foreground leading-tight tracking-tight mb-10`}
          {...reveal(0, "rise", 0)}
        >
          I build high-performance systems — from OS kernels and trading platforms to full-stack web apps and ML models.
        </p>
        <p
          className={`${revealClass} font-sans text-base text-muted-foreground leading-relaxed mb-4 max-w-xl`}
          {...reveal(1, "slide-left", 0)}
        >
          I'm a recent graduate from the Univeristy of Michigan working as a software engineer at Applied Intuition
          with a passion for solving complex problems, moving quickly, and continuously learning.
        </p>
        <p
          className={`${revealClass} font-sans text-base text-muted-foreground leading-relaxed max-w-xl`}
          {...reveal(1, "fade-up-soft", 1)}
        >
          When I'm not coding, you can find me playing soccer, working out, or taking pictures.
        </p>

        <div className="mt-10 border-t border-border pt-8 max-w-xl">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div className={revealClass} {...reveal(1, "scale-in", 2)}>
              <span className="caption block mb-1">Education</span>
              <p className="font-sans text-sm text-foreground">B.S. Computer Science</p>
              <p className="caption text-muted-foreground">University of Michigan</p>
              <p className="caption text-muted-foreground">2022–2026</p>
            </div>
            <div className={revealClass} {...reveal(1, "scale-in", 3)}>
              <span className="caption block mb-1">Location</span>
              <p className="font-sans text-sm text-foreground">Sunnyvale, CA</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isPinned ? "" : "gsap-reveal"} lg:col-span-5`.trim()}>
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
          <img
            src="/Headshot.jpg"
            alt="Nikhil Goli"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const sectionRef = useGSAPReveal(0.12) as React.RefObject<HTMLElement>;
  const [useStaticLayout, setUseStaticLayout] = useState(
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthMq = window.matchMedia("(max-width: 767px)");

    const update = () => setUseStaticLayout(motionMq.matches || widthMq.matches);

    update();
    motionMq.addEventListener("change", update);
    widthMq.addEventListener("change", update);
    return () => {
      motionMq.removeEventListener("change", update);
      widthMq.removeEventListener("change", update);
    };
  }, []);

  useAboutScrollPin({
    outerRef,
    pinRef,
    stepCount: ABOUT_STEP_COUNT,
  });

  if (useStaticLayout) {
    return (
      <SectionWrapper ref={sectionRef} id="about">
        <AboutContent variant="static" />
      </SectionWrapper>
    );
  }

  return (
    <div id="about">
      <div ref={outerRef}>
        <SectionWrapper
          ref={pinRef}
          className="h-screen overflow-hidden !py-0"
        >
          <div className="h-full pt-20 pb-12 flex items-center">
            <AboutContent variant="pinned" />
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default AboutSection;
