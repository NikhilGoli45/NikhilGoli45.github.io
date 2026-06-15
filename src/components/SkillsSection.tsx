import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useGSAPReveal } from "@/hooks/useGSAPReveal";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "Java", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Node.js", "Next.js", "Express.js", "Django", "Flask", "Pandas", "NumPy", "Scikit-Learn", "PyTorch", "Matplotlib", "Boost", "uWebSockets"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "SQLite", "Redis", "Supabase"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "AWS", "GCP", "Docker", "Jira", "Jupyter", "Conda", "npm", "Render"],
  },
];

const SkillsSection = () => {
  const sectionRef = useGSAPReveal(0.1) as React.RefObject<HTMLElement>;

  return (
    <SectionWrapper ref={sectionRef} id="skills" number="04" label="Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {skillCategories.map((category, i) => (
          <div key={i} className="gsap-reveal">
            <h3 className="caption text-muted-foreground mb-5">{category.title}</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {category.skills.map((skill, j) => (
                <span key={j} className="font-sans text-base text-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
