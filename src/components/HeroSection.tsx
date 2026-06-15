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
      .fromTo(indicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 py-32 overflow-hidden"
    >
      <HeroGridBackground />

      <div className="relative z-10 flex flex-col justify-between flex-1">
        {/* Main name block */}
        <div className="mt-auto">
          <h1
            ref={nameRef}
            className="font-display text-display text-foreground leading-none tracking-tight uppercase"
            style={{ opacity: 0 }}
          >
            Nikhil<br />Goli
          </h1>
        </div>

        {/* Role + links row */}
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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

        {/* Scroll indicator */}
        <div
          ref={indicatorRef}
          className="mt-12 flex items-center gap-3"
          style={{ opacity: 0 }}
        >
          <div className="w-6 h-px bg-muted-foreground" />
          <span className="caption">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
