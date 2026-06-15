import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "01 About", id: "about" },
  { label: "02 Experience", id: "experience" },
  { label: "03 Projects", id: "projects" },
  { label: "04 Skills", id: "skills" },
  { label: "05 Contact", id: "contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const scrollToSection = (id: string) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="px-6 md:px-12 lg:px-20 py-6 flex justify-between items-center">
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-sm tracking-widest text-foreground uppercase link-underline"
        >
          NG
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="caption text-foreground hover:text-muted-foreground transition-colors link-underline"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="caption text-foreground text-left"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
