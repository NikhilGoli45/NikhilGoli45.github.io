import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useExperienceScrollPin } from "@/hooks/useExperienceScrollPin";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "a0.dev (YC 25)",
    period: "Jul 2025 – Present",
    achievements: [
      "Enabled AI agents to detect and resolve errors without manual prompts by automatically ingesting and analyzing build and runtime logs, reducing API calls by 15% and preserving users' daily request limits",
      "Identified synchronous localStorage calls as a bottleneck via Chrome DevTools, then leveraged IndexedDB's async APIs to cut main-thread blocking from 1000ms to 300ms (70%) and boost overall site performance by 30%",
    ],
    skills: ["TypeScript", "React", "Next.js", "Chrome DevTools", "Mastra", "AWS"],
  },
  {
    title: "Applied AI Engineering Intern",
    company: "Swept AI",
    period: "May 2025 – Jun 2025",
    achievements: [
      "Built a multi-agent research system with dynamic workflows, allowing a single query to generate multiple structured reports, increasing throughput 4–5× and eliminating the need for manual re-prompting",
      "Optimized a memory-aware RAG pipeline by asynchronously precomputing context for background relevance scoring and embedding retrieval, reducing first-token latency by ~60% in large conversations",
    ],
    skills: ["Python", "LangChain", "LangGraph", "Ollama", "RAG"],
  },
  {
    title: "Technical Strategy Intern",
    company: "Mercedes-Benz Financial Services",
    period: "May 2024 – Aug 2024",
    achievements: [
      "Developed a PoC for an ML-based risk evaluation system using PyTorch to categorize customers based on their likelihood to default, defining input parameters, evaluation metrics, and deployment considerations",
      "Used Jira to collaborate with engineering teams under an Agile framework, translating business needs into technical requirements, and presented proposal to 80+ stakeholders ensuring cross-functional alignment",
    ],
    skills: ["Python", "NumPy", "Pandas", "PyTorch", "Jira"],
  },
  {
    title: "Head of Operations",
    company: "Traders at Michigan",
    period: "Aug 2023 – Present",
    achievements: [
      "Hosted nation's largest collegiate poker tournament with 14+ industry sponsors, including Jane Street, Citadel, and Optiver",
      "Developed Wager Wars and Zinger's, trading-related games played by over 100 traders at the UMich Trading Competition",
      "Grew club membership to 50+ members in just one year",
    ],
    skills: ["Python", "Django", "TypeScript", "React", "C++", "uWebSockets", "Redis", "PostgreSQL", "AWS"],
  },
  {
    title: "Senior Consultant, Project Manager",
    company: "BOND Consulting Group",
    period: "Jan 2023 – Dec 2024",
    achievements: [
      "Analyzed over 2,000,000 points of sales data from a regional food retailer using Excel and Python to create a price-sensitive demand forecasting model, resulting in a $400,000+ increase in projected profits",
      "Evaluated 625 potential locations within Detroit using Pandas and identified the 25 most profitable street corners for a bikeshare station expansion",
    ],
    skills: ["Python", "Pandas"],
  },
];

interface ExperienceEntryProps {
  exp: (typeof experiences)[number];
  showPeriod?: boolean;
  className?: string;
}

const ExperienceEntry = ({ exp, showPeriod = true, className = "" }: ExperienceEntryProps) => (
  <div className={className}>
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
      <h3 className="font-display text-h2 text-foreground leading-none">{exp.company}</h3>
      {showPeriod && (
        <span className="caption text-muted-foreground shrink-0">{exp.period}</span>
      )}
    </div>
    <p className="font-sans text-sm text-muted-foreground uppercase tracking-widest mb-5">{exp.title}</p>
    <ul className="space-y-3 mb-5">
      {exp.achievements.map((a, j) => (
        <li key={j} className="font-sans text-sm text-foreground leading-relaxed pl-4 border-l border-border">
          {a}
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {exp.skills.map((s, j) => (
        <span key={j} className="caption border border-border px-2 py-0.5 text-muted-foreground">
          {s}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
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

  useExperienceScrollPin({
    outerRef,
    pinRef,
    progressRef,
    count: experiences.length,
  });

  const staticList = (
    <div className="max-w-3xl">
      {experiences.map((exp, i) => (
        <div key={i} className="border-t border-border py-10 first:border-t-0">
          <ExperienceEntry exp={exp} />
        </div>
      ))}
    </div>
  );

  if (useStaticLayout) {
    return (
      <SectionWrapper id="experience">
        {staticList}
      </SectionWrapper>
    );
  }

  return (
    <div id="experience">
      <div ref={outerRef}>
        <SectionWrapper
          ref={pinRef}
          className="h-screen overflow-x-visible overflow-y-hidden !py-0"
        >
          <div className="grid grid-cols-12 h-full pt-20 pb-12">
            <div className="experience-card-track col-span-12 lg:col-span-8 relative h-full">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="experience-card absolute inset-0 flex flex-col justify-center"
                >
                  <div className="max-w-3xl w-full border border-border px-6 md:px-8 py-10">
                    <ExperienceEntry exp={exp} showPeriod={false} />
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex lg:col-span-4 lg:col-start-9 relative h-full items-stretch justify-center">
              <div className="relative h-full w-max flex flex-col justify-between py-4">
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-[15px]">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 overflow-hidden">
                    <div
                      ref={progressRef}
                      className="experience-timeline-progress h-full w-full bg-foreground"
                    />
                  </div>
                </div>
                {experiences.map((exp, i) => (
                  <div key={i} className="relative flex items-center gap-4 z-10">
                    <div className="experience-timeline-dot w-[15px] h-[15px] rounded-full border border-foreground bg-background flex-shrink-0" />
                    <span className="experience-timeline-label caption whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default ExperienceSection;
