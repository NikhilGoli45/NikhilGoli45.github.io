import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lenis hijacks wheel events, which fights MapLibre's scroll-zoom, so the
// photography pages opt out of smooth scrolling entirely.
const EXCLUDED_PREFIXES = ["/photography", "/darkroom"];

const SmoothScroll = () => {
  const { pathname } = useLocation();
  const excluded = EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (excluded) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [excluded]);

  return null;
};

export default SmoothScroll;
