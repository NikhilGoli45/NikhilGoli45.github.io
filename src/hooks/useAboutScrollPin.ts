import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ENTER_END = 0.3;
const STAGGER = 0.045;

type AboutVariant = "rise" | "slide-left" | "slide-right" | "fade-up-soft" | "scale-in";

interface VariantProps {
  y: number;
  x: number;
  opacity: number;
  scale: number;
  filter: string;
}

const VARIANTS: Record<AboutVariant, { hidden: VariantProps; visible: VariantProps }> = {
  rise: {
    hidden: { y: 56, x: 0, opacity: 0, scale: 1, filter: "blur(0px)" },
    visible: { y: 0, x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "slide-left": {
    hidden: { y: 0, x: -52, opacity: 0, scale: 1, filter: "blur(0px)" },
    visible: { y: 0, x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "slide-right": {
    hidden: { y: 0, x: 52, opacity: 0, scale: 1, filter: "blur(0px)" },
    visible: { y: 0, x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "fade-up-soft": {
    hidden: { y: 28, x: 0, opacity: 0, scale: 1, filter: "blur(0px)" },
    visible: { y: 0, x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "scale-in": {
    hidden: { y: 8, x: 0, opacity: 0, scale: 0.94, filter: "blur(6px)" },
    visible: { y: 0, x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  },
};

interface AboutScrollPinRefs {
  outerRef: RefObject<HTMLDivElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  stepCount: number;
}

interface AboutRevealItem {
  el: HTMLElement;
  step: number;
  order: number;
  variant: AboutVariant;
}

function parseVariant(value: string | undefined): AboutVariant {
  if (value && value in VARIANTS) return value as AboutVariant;
  return "rise";
}

function lerpVariant(from: VariantProps, to: VariantProps, t: number): VariantProps {
  return {
    y: from.y + (to.y - from.y) * t,
    x: from.x + (to.x - from.x) * t,
    opacity: from.opacity + (to.opacity - from.opacity) * t,
    scale: from.scale + (to.scale - from.scale) * t,
    filter: t >= 1 ? to.filter : from.filter,
  };
}

function applyVariant(el: HTMLElement, props: VariantProps) {
  gsap.set(el, {
    y: props.y,
    x: props.x,
    opacity: props.opacity,
    scale: props.scale,
    filter: props.filter,
  });
}

function applyScrollProgress(
  progress: number,
  items: AboutRevealItem[],
  stepCount: number
) {
  const totalSegments = stepCount + 1;
  const segmentSize = 1 / totalSegments;
  const enterDuration = segmentSize * ENTER_END;

  items.forEach(({ el, step, order, variant }) => {
    const { hidden, visible } = VARIANTS[variant];
    const segmentStart = (step + 1) * segmentSize;
    const itemStart = segmentStart + order * STAGGER;
    const itemEnterEnd = itemStart + enterDuration;

    if (progress < itemStart) {
      applyVariant(el, hidden);
    } else if (progress < itemEnterEnd) {
      const t = (progress - itemStart) / enterDuration;
      applyVariant(el, lerpVariant(hidden, visible, t));
    } else {
      applyVariant(el, visible);
    }
  });
}

export function useAboutScrollPin(refs: AboutScrollPinRefs) {
  const { outerRef, pinRef, stepCount } = refs;
  const totalSegments = stepCount + 1;

  useLayoutEffect(() => {
    if (reducedMotion()) return;

    const outer = outerRef.current;
    const pin = pinRef.current;

    if (!outer || !pin) return;

    const items: AboutRevealItem[] = [
      ...pin.querySelectorAll<HTMLElement>(".about-reveal-item"),
    ].map((el) => ({
      el,
      step: Number(el.dataset.aboutStep ?? 0),
      order: Number(el.dataset.aboutOrder ?? 0),
      variant: parseVariant(el.dataset.aboutVariant),
    }));

    if (!items.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const update = (p: number) => applyScrollProgress(p, items, stepCount);

      const st = ScrollTrigger.create({
        id: "about-pin",
        trigger: outer,
        start: "top top",
        end: () => `+=${window.innerHeight * totalSegments}`,
        pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
      });

      update(st.progress);

      return () => st.kill();
    });

    return () => mm.revert();
  }, [stepCount, outerRef, pinRef, totalSegments]);
}
