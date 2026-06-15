import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useGSAPReveal(stagger = 0.1) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || reducedMotion()) return;

    const targets = ref.current.querySelectorAll<HTMLElement>(".gsap-reveal");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger]);

  return ref;
}

export function useGSAPWordReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || reducedMotion()) return;

    const el = ref.current;
    const text = el.textContent || "";
    const words = text.split(" ");

    el.innerHTML = words
      .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block gsap-word">${w}</span></span>`)
      .join(" ");

    const wordEls = el.querySelectorAll<HTMLElement>(".gsap-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
