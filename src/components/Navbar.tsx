
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Determine text color based on theme and scroll state
  const textColor = theme === "dark" 
    ? "text-white" 
    : isScrolled ? "text-white" : "text-black";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/50 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#" 
          className={`text-xl font-bold ${textColor}`}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          NIKHIL GOLI
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {["home", "about", "education", "experience", "projects", "skills"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item === "home" ? "hero" : item)}
              className={`${textColor} hover:opacity-70 font-medium capitalize transition-colors`}
            >
              {item}
            </button>
          ))}
          <Button 
            size="icon" 
            variant="ghost" 
            className={textColor}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className={textColor}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={textColor}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 shadow-lg animate-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {["home", "about", "education", "experience", "projects", "skills"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === "home" ? "hero" : item)}
                className="text-white hover:text-gray-300 font-medium capitalize py-2 transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
