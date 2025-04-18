import { ReactNode } from "react";

// Tech icons from lucide and custom SVG logos
import { Code, Braces, Database, Settings, Library, Terminal, Globe } from "lucide-react";

// Define the skills categories with their logos
interface Skill {
  name: string;
  logo: ReactNode | string;
}

interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "Python", logo: "python.png" },
      { name: "C++", logo: "C++.png" },
      { name: "C", logo: "C.png" },
      { name: "JavaScript", logo: "js.webp" },
      { name: "TypeScript", logo: "ts.png" },
      { name: "Java", logo: "java.png" },
      { name: "HTML", logo: "html.png" },
      { name: "CSS", logo: "css.png" },
      { name: "Tailwind CSS", logo: "tailwind.png" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Library className="w-6 h-6" />,
    skills: [
      { name: "React", logo: "react.png" },
      { name: "Node.js", logo: "nodejs.png" },
      { name: "Django", logo: "django.png" },
      { name: "Flask", logo: "flask.png" },
      { name: "Pandas", logo: "pandas.png" },
      { name: "NumPy", logo: "NumPy.png" },
      { name: "Scikit-Learn", logo: "sklearn.png" },
      { name: "PyTorch", logo: "pytorch.png" },
      { name: "MatPlotlib", logo: "plot.png" },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "PostgreSQL", logo: "postgre.png" },
      { name: "SQLite", logo: "sqlite.png" },
      { name: "Redis", logo: "redis.webp" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: <Settings className="w-6 h-6" />,
    skills: [
      { name: "VS Code", logo: "vscode.png" },
      { name: "XCode", logo: "xcode.webp" },
      { name: "Jupyter", logo: "jupyter.png" },
      { name: "LLVM", logo: "lldb.png" },
      { name: "Git", logo: "git.png" },
      { name: "Conda", logo: "conda.png" },
      { name: "npm", logo: "npm.png" },
      { name: "AWS", logo: "aws.png" },
      { name: "Jira", logo: "jira.png" },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
        </div>

        <div className="max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex flex-col items-center">
                    <div className="w-20 h-20 mb- flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      {typeof skill.logo === "string" ? (
                        <div
                          className="w-20 h-20 bg-center bg-no-repeat bg-contain"
                          style={{
                            backgroundImage: `url(${skill.logo.split("#")[0]})`,
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                          }}
                        />
                      ) : (
                        skill.logo
                      )}
                    </div>
                    <span className="text-center font-medium text-base mb-10">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Additional Skills
          </h3>

          <div className="flex flex-wrap gap-4">
            {[
              "Responsive Design",
              "UI/UX",
              "RESTful APIs",
              "GraphQL",
              "Testing",
              "Agile/Scrum",
              "Problem Solving",
              "Team Collaboration",
            ].map((skill, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-secondary dark:bg-gray-700 dark:text-white rounded-lg font-medium"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
