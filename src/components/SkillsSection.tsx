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
      { name: "Python", logo: "icons/python.png" },
      { name: "C++", logo: "icons/C++.png" },
      { name: "C", logo: "icons/C.png" },
      { name: "JavaScript", logo: "icons/js.webp" },
      { name: "TypeScript", logo: "icons/ts.png" },
      { name: "Java", logo: "icons/java.png" },
      { name: "HTML", logo: "icons/html.png" },
      { name: "CSS", logo: "icons/css.png" },
      { name: "Tailwind CSS", logo: "icons/tailwind.png" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Library className="w-6 h-6" />,
    skills: [
      { name: "React", logo: "icons/react.png" },
      { name: "Node.js", logo: "icons/nodejs.png" },
      { name: "Next.js", logo: "icons/nextjs.png" },
      { name: "Express.js", logo: "icons/express.png" },
      { name: "Django", logo: "icons/django.png" },
      { name: "Flask", logo: "icons/flask.png" },
      { name: "Pandas", logo: "icons/pandas.png" },
      { name: "NumPy", logo: "icons/NumPy.png" },
      { name: "Scikit-Learn", logo: "icons/sklearn.png" },
      { name: "PyTorch", logo: "icons/pytorch.png" },
      { name: "MatPlotlib", logo: "icons/plot.png" },
      { name: "Websockets", logo: "icons/ws.svg" },
      { name: "Boost", logo: "icons/boost.png" },
      { name: "uWebsockets", logo: "icons/uWS.svg" },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "PostgreSQL", logo: "icons/postgre.png" },
      { name: "SQLite", logo: "icons/sqlite.png" },
      { name: "Redis", logo: "icons/redis.webp" },
      { name: "Supabase", logo: "icons/supabase.png" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: <Settings className="w-6 h-6" />,
    skills: [
      { name: "VS Code", logo: "icons/vscode.png" },
      { name: "XCode", logo: "icons/xcode.webp" },
      { name: "Jupyter", logo: "icons/jupyter.png" },
      { name: "LLVM", logo: "icons/lldb.png" },
      { name: "Git", logo: "icons/git.png" },
      { name: "Conda", logo: "icons/conda.png" },
      { name: "npm", logo: "icons/npm.png" },
      { name: "AWS", logo: "icons/aws.png" },
      { name: "GCP", logo: "icons/gcp.png" },
      { name: "Jira", logo: "icons/jira.png" },
      { name: "JWT", logo: "icons/jwt.png" },
      { name: "Render", logo: "icons/render.webp" },
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

        {/* <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
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
        </div> */}
      </div>
    </section>
  );
};

export default SkillsSection;
