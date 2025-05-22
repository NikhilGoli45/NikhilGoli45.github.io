import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";

// Import custom pages
import NFS from "@/pages/projects/NFS";
import OS from "./projects/OS";
import WagerWars from "./projects/WagerWars";
import DogClassifier from "./projects/DogClassifier";
import SOR from "./projects/SOR";
import ETF from "./projects/ETF";
import IMC from "./projects/IMC";
import SQL from "./projects/SQL";
import Forum from "./projects/Forum";
import NA from "./projects/NA";

// Map project IDs to their custom page components
const customPages: Record<string, React.FC> = {
  NFS,
  OS,
  WagerWars,
  DogClassifier,
  SOR,
  ETF,
  IMC,
  SQL,
  Forum,
  NA
  // Add more custom mappings like "Zingers": ZingersPage if needed
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-24">
          <h1 className="text-2xl font-semibold text-center">Invalid project ID</h1>
        </main>
        <Footer />
      </div>
    );
  }

  // Render custom page if one exists
  const CustomComponent = customPages[id];
  if (CustomComponent) {
    return <CustomComponent />;
  }

  // Otherwise fallback to generic rendering
  const project = projects.find((p) => p.id.toLowerCase() === id.toLowerCase());

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-24">
          <h1 className="text-2xl font-semibold text-center">Project not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-24">
        <Button
          onClick={() => navigate("/#projects")}
          variant="ghost"
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Button>

        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>

        {project.challenge && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Challenge</h2>
            <p className="text-gray-700 dark:text-gray-400">{project.challenge}</p>
          </div>
        )}

        {project.solution && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Solution</h2>
            <p className="text-gray-700 dark:text-gray-400">{project.solution}</p>
          </div>
        )}

        {project.features && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400 hover:opacity-80"
            >
              View Repo
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400 hover:opacity-80"
            >
              View Demo
            </a>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
