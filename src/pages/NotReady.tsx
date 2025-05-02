
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotReady = () => {
  const navigate = useNavigate();

  const handleBackToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const yOffset = -70; // Adjust this based on your navbar height
        const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-bold mb-6">Coming Soon!</h1>
          <div className="mb-8">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              This project detail page is still under construction.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Please check back later for more information about this exciting project!
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button size="lg" className="flex items-center gap-2" onClick={handleBackToProjects}>
              <ArrowLeft className="w-4 h-4" />
              Return to Projects
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotReady;