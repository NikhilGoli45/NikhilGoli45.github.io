
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "a0.dev (YC 25)",
    period: "Jul 2025 -  Present",
    description: "Building out an LLM evaluation framework from scratch and optimizing product performance.",
    achievements: [
      "Enabled AI agents to detect and resolve errors without manual prompts by automatically ingesting and analyzing build and runtime logs, reducing API calls by 15% and preserving users' daily request limits",
      "Identified synchronous localStorage calls as a bottleneck via Chrome DevTools, then leveraged IndexedDB's async APIs to cut main-thread blocking from 1000ms to 300ms (70%) and boost overall site performance by 30%",
    ],
    skills: ["TypeScript", "React", "Next.js", "Chrome DevTools", "Mastra", "AWS"]
  },
  {
    title: "Applied AI Engineering Intern",
    company: "Swept AI",
    period: "May 2025 - Jun 2025",
    description: "Built AI Agents using local LLMs with Ollama and LangChain to automate complex tasks and save costs.",
    achievements: [
      "Built a multi-agent research system with dynamic workflows, allowing a single query to generate multiple structured reports, increasing throughput 4-5x and eliminating the need for manual re-prompting",
      "Optimized a memory-aware RAG pipeline by asynchronously precomputing context for background relevance scoring and embedding retrieval, reducing first-token latency by ~60% in large conversations",
    ],
    skills: ["Python", "Langchain", "LangGraph", "Ollama", "RAG"]
  },
  {
    title: "Technical Strategy Intern",
    company: "Mercedes-Benz Financial Services",
    period: "May 2024 - Aug 2024",
    description: "Developed PoCs and proposals for AI/ML applications to streamline and automate business processes.",
    achievements: [
      "Developed a PoC for an ML-based risk evaluation system using PyTorch to categorize customers based on their likelihood to default, defining input parameters, evaluation metrics, and deployment considerations",
      "Used Jira to collaborate with engineering teams under an Agile framework, translating business needs into technical requirements, and presented proposal to 80+ stakeholders ensuring cross-functional alignment",
    ],
    skills: ["Python", "NumPy", "Pandas", "PyTorch", "Jira"]
  },
  {
    title: "Head of Operations",
    company: "Traders at Michigan - University of Michigan",
    period: "Aug 2023 - Present",
    description: "Leading education in SWE and quant finance while organizing and developing full-stack web applications for nation-wide events like the annual Poker Tournament and Trading Competition.",
    achievements: [
      "Hosted nation's largest collegiate poker tournament with 14+ industry sponsors, including top firms like Jane Street, Citadel, and Optiver",
      "Developed Wager Wars and Zinger's, trading related games played by over 100 traders at the Umich Trading Competition",
      "Grew club membership to 50+ members in just one year"
    ],
    skills: ["Python", "Django", "TypeScript", "React", "C++", "uWebSockets", "Redis", "PostgreSQL", "AWS"]
  },
  {
    title: "Senior Consultant, Project Manager",
    company: "BOND Consulting Group - University of Michigan",
    period: "Jan 2023 - Dec 2024",
    description: "Worked on pro-bono consulting projects for Michigan-based companies, delivering strategic and financial reccomendations to grow the business.",
    achievements: [
      "Analyzed over 2,000,000 points of sales data from regional food retailer using Excel and Python to create a price sensitive demand forecasting model and suggested price improvements resulting in a $400,000+ increase in projected profits",
      "Completed rigorous research to identify 10 factors affecting ridership for a bikeshare program and used Pandas to efficiently evaluate 625 potential locations within Detroit and determined the 25 most profitable street corners for a bike station",
    ],
    skills: ["Python", "Pandas"]
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-8 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-900 z-10 mt-8"></div>
                
                <div className="ml-16">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mt-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="bullet-indent">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
