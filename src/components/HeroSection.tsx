import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroGridBackground from "./HeroGridBackground";

const HeroSection = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(nameRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
      .fromTo(linksRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
      .fromTo(indicatorRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2");
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col px-6 md:px-12 lg:px-20 pt-28 md:pt-32 pb-6 md:pb-10 overflow-hidden"
    >
      <HeroGridBackground />

      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        {/* Main name block — vertically centered above bottom content */}
        <div className="flex-1 flex items-center">
          <h1
            ref={nameRef}
            className="font-display text-display text-foreground leading-none tracking-tight uppercase"
            style={{ opacity: 0 }}
          >
            Nikhil<br />Goli
          </h1>
        </div>

        {/* Scroll indicator — centered */}
        <div
          ref={indicatorRef}
          className="flex flex-col items-center gap-2 self-center mb-10 md:mb-14"
          style={{ opacity: 0 }}
        >
          <span className="caption">Scroll</span>
          <svg
            className="scroll-arrow w-4 h-4 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>

        {/* Role + links — anchored to bottom */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p
            ref={subRef}
            className="caption text-muted-foreground max-w-xs"
            style={{ opacity: 0 }}
          >
            Software Engineer<br />
            Applied Intuition, Sunnyvale, CA
          </p>

          <div
            ref={linksRef}
            className="flex items-center gap-8"
            style={{ opacity: 0 }}
          >
            <a
              href="https://www.linkedin.com/in/nikhilgoli/"
              target="_blank"
              rel="noopener noreferrer"
              className="caption text-foreground link-underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/NikhilGoli45"
              target="_blank"
              rel="noopener noreferrer"
              className="caption text-foreground link-underline"
            >
              GitHub
            </a>
            <a
              href="mailto:ngoli@umich.edu"
              className="caption text-foreground link-underline"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
