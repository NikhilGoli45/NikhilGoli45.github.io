import { createRoot } from "react-dom/client";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App.tsx";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById("root")!).render(<App />);
