
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementPosition = (element as HTMLElement).getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (elementPosition < windowHeight - 100) {
          element.classList.add('visible');
        }
      });
    };
    
    // Initial check
    setTimeout(animateOnScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
};
