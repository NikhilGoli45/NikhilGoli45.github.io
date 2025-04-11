
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            &copy; {currentYear} Nikhil Goli. All rights reserved.
          </p>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <span>Built with TypeScript using React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
