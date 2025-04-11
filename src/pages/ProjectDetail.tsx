
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/#projects" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <Link 
              to="/#projects" 
              className="text-primary inline-flex items-center hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
          
          <div className="aspect-video w-full max-w-4xl mx-auto bg-gray-200 dark:bg-gray-800 mb-8 rounded-lg overflow-hidden">
            {project.image === "placeholder" ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Project Screenshot
              </div>
            ) : (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <h2>Project Overview</h2>
              <p>{project.description}</p>
              
              <h2>Challenge</h2>
              <p>{project.challenge || "The main challenge of this project was creating a seamless user experience while maintaining high performance and scalability."}</p>
              
              <h2>Solution</h2>
              <p>{project.solution || "I implemented a modern architecture using the latest technologies to ensure both functionality and maintainability, with a focus on responsive design and intuitive user interfaces."}</p>
              
              {project.features && (
                <>
                  <h2>Key Features</h2>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="flex gap-2 items-center" asChild>
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  View Live Demo
                  <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="flex gap-2 items-center" asChild>
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  Source Code
                  <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
