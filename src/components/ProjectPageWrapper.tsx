import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  children: React.ReactNode;
}

const ProjectPageWrapper = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP's pin cleanup from the home page schedules a rAF to remove its spacer,
    // which changes scroll offset after ScrollToTop already ran. One rAF here
    // fires after that cleanup rAF and reliably lands at the top.
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleBack = () => {
    // If we have history to go back to, use it (position will be restored by Index.tsx)
    // Otherwise fall back to the projects hash route
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/#projects");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-6 md:px-12 py-24">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="caption uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-12"
          >
            <ArrowLeft className="w-3 h-3" />
            Projects
          </button>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPageWrapper;
