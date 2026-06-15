import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_OFFSET, scrollToSection as scrollToSectionTarget } from "@/utils/scrollToSection";

const navItems = [
  { label: "01 About", id: "about" },
  { label: "02 Experience", id: "experience" },
  { label: "03 Projects", id: "projects" },
  { label: "04 Skills", id: "skills" },
  { label: "05 Contact", id: "contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      setIndicator({ left: 0, width: 0, opacity: 0 });
      return;
    }

    const updateIndicatorPosition = (sectionId: string) => {
      const btn = buttonRefs.current[sectionId];
      const nav = navRef.current;
      if (!btn || !nav) return;
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    };

    const detectActiveSection = (): string => {
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= NAV_OFFSET && bottom > NAV_OFFSET) {
          return id;
        }
      }

      let current = "";
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= NAV_OFFSET) {
          current = id;
        }
      }
      return current;
    };

    const update = () => {
      setScrolled(window.scrollY > 20);
      const current = detectActiveSection();
      setActiveSection(current);
      if (current) {
        updateIndicatorPosition(current);
      } else {
        setIndicator({ left: 0, width: 0, opacity: 0 });
      }
    };

    update();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  const scrollToSection = (id: string) => {
    if (isHome) {
      setActiveSection(id);
      requestAnimationFrame(() => {
        const btn = buttonRefs.current[id];
        const nav = navRef.current;
        if (btn && nav) {
          const navRect = nav.getBoundingClientRect();
          const btnRect = btn.getBoundingClientRect();
          setIndicator({
            left: btnRect.left - navRect.left,
            width: btnRect.width,
            opacity: 1,
          });
        }
      });
      scrollToSectionTarget(id);
      setMobileMenuOpen(false);
    } else {
      navigate(`/#${id}`);
    }
  };

  const navLinkClass = (id: string) =>
    `caption transition-colors duration-300 ${
      activeSection === id
        ? "!text-foreground"
        : "hover:!text-foreground/70"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background" : "bg-transparent"
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
        <nav ref={navRef} className="hidden md:flex items-center gap-8 relative">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              ref={(el) => {
                buttonRefs.current[id] = el;
              }}
              onClick={() => scrollToSection(id)}
              className={navLinkClass(id)}
            >
              {label}
            </button>
          ))}
          <span
            aria-hidden
            className="absolute -bottom-1 h-px bg-foreground pointer-events-none transition-[left,width,opacity] duration-300 ease-in-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
          />
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
              className={`caption text-left transition-colors duration-300 ${
                activeSection === id ? "!text-foreground" : ""
              }`}
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
