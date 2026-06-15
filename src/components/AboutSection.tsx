import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";

const AboutSection = () => {
  const sectionRef = useGSAPReveal(0.12) as React.RefObject<HTMLElement>;

  return (
    <SectionWrapper ref={sectionRef} id="about" number="01" label="About">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Pull quote — spans 7 cols */}
        <div className="lg:col-span-7">
          <p className="gsap-reveal font-display text-h2 text-foreground leading-tight tracking-tight mb-10">
            I build high-performance systems — from OS kernels and trading platforms to full-stack web apps and ML models.
          </p>
          <p className="gsap-reveal font-sans text-base text-muted-foreground leading-relaxed mb-4 max-w-xl">
            I'm a software engineer at Applied Intuition 
            with a passion for solving complex problems, moving quickly, and continuously learning.
          </p>
          <p className="gsap-reveal font-sans text-base text-muted-foreground leading-relaxed max-w-xl">
            When I'm not coding, you can find me playing soccer, listening to music, or going to car meets.
          </p>

          <div className="gsap-reveal mt-10 grid grid-cols-2 gap-x-12 gap-y-6 border-t border-border pt-8 max-w-xl">
            <div>
              <span className="caption block mb-1">Education</span>
              <p className="font-sans text-sm text-foreground">B.S. Computer Science</p>
              <p className="caption text-muted-foreground">University of Michigan · 2022–2026</p>
            </div>
            <div>
              <span className="caption block mb-1">Location</span>
              <p className="font-sans text-sm text-foreground">Sunnyvale, CA</p>
              {/* <p className="caption text-muted-foreground">Open to relocation &amp; remote</p> */}
            </div>
          </div>
        </div>

        {/* Headshot — spans 5 cols, editorial crop */}
        <div className="gsap-reveal lg:col-span-5">
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <img
              src="/Headshot.jpg"
              alt="Nikhil Goli"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
