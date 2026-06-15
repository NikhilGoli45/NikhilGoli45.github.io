import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";

const education = {
  university: "University of Michigan",
  degree: "Double Major — Computer Science & Mathematics of Finance",
  duration: "2022 – 2026",
  gpa: "4.0 / 4.0",
  courses: {
    computerScience: [
      "Data Structures and Algorithms",
      "Discrete Mathematics",
      "Computer Organization",
      "Operating Systems",
      "Machine Learning",
      "Software Engineering",
    ],
    mathematics: [
      "Calculus I, II & III",
      "Linear Algebra",
      "Honors Differential Equations",
      "Probability",
      "Mathematics of Finance",
      "Real Analysis",
    ],
  },
};

const EducationSection = () => {
  const [csOpen, setCsOpen] = useState(false);
  const [mathOpen, setMathOpen] = useState(false);
  const sectionRef = useGSAPReveal(0.1) as React.RefObject<HTMLElement>;

  return (
    <SectionWrapper ref={sectionRef} id="education" number="05" label="Education">
      <div className="gsap-reveal flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-10">
        <h2 className="font-display text-h1 text-foreground leading-none tracking-tight">
          {education.university}
        </h2>
        <span className="caption text-muted-foreground">{education.duration}</span>
      </div>

      <div className="gsap-reveal mb-8 max-w-xl">
        <p className="font-sans text-base text-foreground mb-1">{education.degree}</p>
        <span className="caption text-muted-foreground">GPA: {education.gpa}</span>
      </div>

      <div className="gsap-reveal grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        {/* CS Coursework */}
        <Collapsible open={csOpen} onOpenChange={setCsOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between border border-border px-4 py-3 text-left hover:bg-secondary transition-colors">
            <span className="caption text-foreground">Computer Science</span>
            <span className="caption text-muted-foreground">{csOpen ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="border border-t-0 border-border divide-y divide-border">
              {education.courses.computerScience.map((course, i) => (
                <li key={i} className="px-4 py-2">
                  <span className="font-sans text-sm text-muted-foreground">{course}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* Math Coursework */}
        <Collapsible open={mathOpen} onOpenChange={setMathOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between border border-border px-4 py-3 text-left hover:bg-secondary transition-colors">
            <span className="caption text-foreground">Mathematics</span>
            <span className="caption text-muted-foreground">{mathOpen ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="border border-t-0 border-border divide-y divide-border">
              {education.courses.mathematics.map((course, i) => (
                <li key={i} className="px-4 py-2">
                  <span className="font-sans text-sm text-muted-foreground">{course}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </SectionWrapper>
  );
};

export default EducationSection;
