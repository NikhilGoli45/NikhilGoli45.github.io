import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";

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

const ExperienceSection = () => {
  const sectionRef = useGSAPReveal(0.08) as React.RefObject<HTMLElement>;

  return (
    <SectionWrapper ref={sectionRef} id="experience" number="02" label="Experience">
      <div className="max-w-3xl">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="gsap-reveal border-t border-border py-10 first:border-t-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
              <h3 className="font-display text-h2 text-foreground leading-none">{exp.company}</h3>
              <span className="caption text-muted-foreground shrink-0">{exp.period}</span>
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
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
