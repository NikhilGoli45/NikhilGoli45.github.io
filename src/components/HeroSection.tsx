import { useEffect, useState, useRef } from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const BinaryBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [binaryCodes, setBinaryCodes] = useState<{ id: number, x: number, y: number, delay: number, value: string }[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Generate binary code elements
    const numberOfCodes = Math.floor(containerWidth * containerHeight / 10000);
    const newBinaryCodes = [];
    
    for (let i = 0; i < numberOfCodes; i++) {
      newBinaryCodes.push({
        id: i,
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        delay: Math.random() * 5,
        value: Math.random() > 0.5 ? '1' : '0'
      });
    }
    
    setBinaryCodes(newBinaryCodes);
    
    // Clean up
    return () => {
      setBinaryCodes([]);
    };
  }, []);

  useEffect(() => {
    // Re-render binary when theme changes
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Regenerate binary code elements with new colors for the theme
    const numberOfCodes = Math.floor(containerWidth * containerHeight / 10000);
    const newBinaryCodes = [];
    
    for (let i = 0; i < numberOfCodes; i++) {
      newBinaryCodes.push({
        id: i,
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        delay: Math.random() * 5,
        value: Math.random() > 0.5 ? '1' : '0'
      });
    }
    
    setBinaryCodes(newBinaryCodes);
  }, [theme]);

  return (
    <div ref={containerRef} className="binary-background">
      {binaryCodes.map((code) => (
        <div 
          key={code.id}
          className="binary-code"
          style={{ 
            left: `${code.x}px`, 
            top: `${code.y}px`,
            animationDelay: `${code.delay}s`
          }}
        >
          {code.value}
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();

  // Set active class when the component mounts
  useEffect(() => {
    setIsActive(true);
    
    // Update document class to control social icons visibility
    document.body.classList.add('hero-section-active');
    
    // Clean up function
    return () => {
      document.body.classList.remove('hero-section-active');
    };
  }, []);

  // Clean up the active class when user scrolls away
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;
      
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      
      // If user scrolled past hero section
      if (scrollPosition > heroBottom - 100) {
        document.body.classList.remove('hero-section-active');
      } else {
        document.body.classList.add('hero-section-active');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative hero-background">
      {/* Binary Background */}
      <BinaryBackground />
      
      {/* Social Media Icons */}
      <div className="social-icons relative z-20">
        <a 
          href="https://www.linkedin.com/in/nikhilgoli/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn" 
          className="social-icon-link"
        >
          <Linkedin className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
        </a>
        <a 
          href="https://github.com/NikhilGoli45" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub" 
          className="social-icon-link"
        >
          <Github className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
        </a>
        <a 
          href="mailto:ngoli@umich.com" 
          aria-label="Email" 
          className="social-icon-link"
        >
          <Mail className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
        </a>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <p className={`hero-content text-3xl mb-2 ${isActive ? 'fade-in delay-100' : ''}`}>HI, I'M</p>
        <h1 className={`text-7xl md:text-9xl font-bold tracking-tighter mb-2 hero-content ${isActive ? 'fade-in delay-200' : ''}`}>
          NIKHIL
        </h1>
        <p className={`hero-content text-xl tracking-widest ${isActive ? 'fade-in delay-300' : ''}`}>A SOFTWARE ENGINEER</p>
      </div>
    </section>
  );
};

export default HeroSection;
