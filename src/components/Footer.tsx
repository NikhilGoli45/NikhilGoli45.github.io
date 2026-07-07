import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="px-6 md:px-12 lg:px-20 py-5 border-t border-border flex items-center justify-between">
    <p className="caption text-muted-foreground">
      © {new Date().getFullYear()} Nikhil Goli
    </p>
    <Link to="/photography" className="caption text-muted-foreground link-underline">
      Photography
    </Link>
  </footer>
);

export default Footer;
