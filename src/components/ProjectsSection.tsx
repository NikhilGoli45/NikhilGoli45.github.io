import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const readyProjectIds = ["NFS", "OS", "WagerWars", "DogClassifier", "SOR", "ETF", "IMC", "SQL", "Forum", "NA"];

const ProjectsSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Only apply horizontal scroll on md+ screens
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const totalWidth = track.scrollWidth - outer.offsetWidth;

      const tween = gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* Section header outside the pinned area */}
      <div className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 lg:pt-40 pb-12 border-t border-border">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-h1 text-foreground leading-none tracking-tight">Projects</h2>
          <span className="caption text-muted-foreground">03 · {projects.length} works</span>
        </div>
      </div>

      {/* Pinned horizontal scroll container */}
      <div ref={outerRef} id="projects" className="overflow-hidden">
        <div ref={trackRef} className="h-scroll-track">
          {projects.map((project, i) => {
            const to = readyProjectIds.includes(project.id)
              ? `/projects/${project.id}`
              : "/projects/not-ready";

            return (
              <Link
                key={project.id}
                to={to}
                className="group flex-shrink-0 w-[85vw] md:w-[55vw] lg:w-[45vw] h-[70vh] md:h-screen flex flex-col justify-between px-8 md:px-12 py-12 border-l border-border bg-background hover:bg-secondary transition-colors duration-300"
              >
                <div className="flex items-start justify-between">
                  <span className="caption text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="caption text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-h2 text-foreground leading-tight tracking-tight mb-4 group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="caption border border-border px-2 py-0.5 text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile fallback: stacked cards (hidden on md+) */}
      {/* The above already works on mobile via normal overflow, no extra markup needed */}
    </>
  );
};

export default ProjectsSection;
