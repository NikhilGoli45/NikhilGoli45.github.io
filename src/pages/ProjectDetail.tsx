import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import ProjectPageWrapper from "@/components/ProjectPageWrapper";

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
  NA,
};

const ProjectDetail = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-6 md:px-12 py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-2xl">Invalid project ID</h1>
          </div>
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
        <main className="flex-grow px-6 md:px-12 py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-2xl">Project not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">{project.title}</h1>
      <p className="text-lg text-muted-foreground mb-10">{project.description}</p>

      {project.challenge && (
        <section className="mb-10">
          <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Challenge</h2>
          <p className="text-muted-foreground">{project.challenge}</p>
        </section>
      )}

      {project.solution && (
        <section className="mb-10">
          <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Solution</h2>
          <p className="text-muted-foreground">{project.solution}</p>
        </section>
      )}

      {project.features && (
        <section className="mb-10">
          <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Features</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {project.technologies && (
        <section className="mb-10">
          <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="caption border border-border px-2 py-0.5">{tech}</span>
            ))}
          </div>
        </section>
      )}

      <div className="border-t border-border pt-8 mt-10 flex gap-6">
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="caption uppercase tracking-widest border border-border px-4 py-2 hover:bg-secondary transition-colors"
          >
            GitHub →
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="caption uppercase tracking-widest border border-border px-4 py-2 hover:bg-secondary transition-colors"
          >
            Demo →
          </a>
        )}
      </div>
    </ProjectPageWrapper>
  );
};

export default ProjectDetail;
