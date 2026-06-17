import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const needsProjectsPin = () =>
  window.matchMedia("(min-width: 768px)").matches && !reducedMotion();

const PIN_VIEWPORTS = 1.5;
const STAGGER = 0.35;

interface EducationScrollPinRefs {
  outerRef: RefObject<HTMLDivElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  enabled: boolean;
}

interface WirePath {
  el: SVGPathElement;
  length: number;
}

function collectDrawPaths(pin: HTMLElement): WirePath[] {
  return [...pin.querySelectorAll<SVGPathElement>(".education-crest .wireframe-draw [data-wire]")].map(
    (el) => {
      void el.getBoundingClientRect();
      const length = el.getTotalLength();
      return { el, length: length > 0 ? length : 1 };
    }
  );
}

function prepareDrawPaths(paths: WirePath[]) {
  paths.forEach(({ el, length }) => {
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    el.style.opacity = "1";
  });
}

export function useEducationScrollPin(refs: EducationScrollPinRefs) {
  const { outerRef, pinRef, enabled } = refs;

  useEffect(() => {
    if (!enabled || reducedMotion()) return;

    const outer = outerRef.current;
    const pin = pinRef.current;
    if (!outer || !pin) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setup = (retries = 0) => {
      if (cancelled) return;

      // Projects pin adds a large scroll spacer; wait for it so our start
      // position isn't calculated before the document height is final.
      if (needsProjectsPin() && !ScrollTrigger.getById("projects-pin") && retries < 32) {
        requestAnimationFrame(() => setup(retries + 1));
        return;
      }

      const paths = collectDrawPaths(pin);
      if (!paths.length) {
        if (retries < 32) requestAnimationFrame(() => setup(retries + 1));
        return;
      }

      prepareDrawPaths(paths);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "education-pin",
            trigger: outer,
            start: "top top",
            end: () => `+=${window.innerHeight * PIN_VIEWPORTS}`,
            pin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        paths.forEach(({ el, length }, i) => {
          tl.fromTo(
            el,
            { strokeDashoffset: length },
            { strokeDashoffset: 0, duration: 1 },
            i * STAGGER
          );
        });

        ScrollTrigger.refresh();

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      cleanup = () => mm.revert();
    };

    setup();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [enabled, outerRef, pinRef]);
}
