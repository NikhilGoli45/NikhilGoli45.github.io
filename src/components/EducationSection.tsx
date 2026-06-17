import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";
import { useEducationScrollPin } from "@/hooks/useEducationScrollPin";
import { MichiganCrestWireframe } from "@/components/education/MichiganCrestWireframe";

const education = {
  university: "University of Michigan",
  degree: "Bachelor's of Science in Computer Science, Minor in Mathematics",
  duration: "2022 - 2026",
  gpa: "3.97 / 4.0",
  courses: [
    {
      title: "Computer Science",
      items: [
        "Data Structures and Algorithms",
        "Discrete Mathematics",
        "Computer Organization",
        "Operating Systems",
        "Machine Learning",
        "Software Engineering",
      ],
    },
    {
      title: "Mathematics",
      items: [
        "Calculus I, II & III",
        "Linear Algebra",
        "Honors Differential Equations",
        "Probability",
        "Mathematics of Finance",
        "Real Analysis",
      ],
    },
  ],
};

interface EducationContentProps {
  variant: "static" | "pinned";
}

const EducationContent = ({ variant }: EducationContentProps) => {
  const isPinned = variant === "pinned";
  const revealClass = isPinned ? "" : "gsap-reveal";
  const courseTextSize = isPinned ? "text-sm" : "text-sm lg:text-base";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
      <div className="lg:col-span-7">
        <div className={`${revealClass} flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6`}>
          <h2 className="font-display text-h1 text-foreground leading-none tracking-tight">
            {education.university}
          </h2>
          <span className="caption text-muted-foreground">{education.duration}</span>
        </div>

        <div className={`${revealClass} mb-10 max-w-xl`}>
          <p className="font-sans text-base text-foreground mb-1">{education.degree}</p>
          <span className="caption text-muted-foreground">GPA: {education.gpa}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12">
          {education.courses.map((category) => (
            <div key={category.title} className={revealClass}>
              <h3 className="caption text-muted-foreground mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((course) => (
                  <li key={course} className={`font-sans ${courseTextSize} text-foreground`}>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={`${revealClass} lg:col-span-5 flex items-center justify-center`}>
        <MichiganCrestWireframe
          drawn={!isPinned}
          className="w-full max-w-[260px] lg:max-w-[320px] aspect-square"
        />
      </div>
    </div>
  );
};

const EducationSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const sectionRef = useGSAPReveal(0.1) as React.RefObject<HTMLElement>;
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

  useEducationScrollPin({ outerRef, pinRef, enabled: !useStaticLayout });

  if (useStaticLayout) {
    return (
      <SectionWrapper ref={sectionRef} id="education">
        <EducationContent variant="static" />
      </SectionWrapper>
    );
  }

  return (
    <div id="education">
      <div ref={outerRef}>
        <SectionWrapper ref={pinRef} className="h-screen overflow-hidden !py-0 bg-background">
          <div className="h-full pt-20 pb-12 flex items-center">
            <EducationContent variant="pinned" />
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default EducationSection;
