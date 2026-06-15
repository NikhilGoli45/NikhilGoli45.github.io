import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ENTER_END = 0.3;
const HOLD_END = 0.7;
const SLIDE_OFFSET = 56;

interface ExperienceScrollPinRefs {
  outerRef: RefObject<HTMLDivElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  progressRef: RefObject<HTMLDivElement | null>;
  count: number;
}

function applyScrollProgress(
  progress: number,
  cards: HTMLDivElement[],
  dots: HTMLDivElement[],
  labels: HTMLSpanElement[],
  progressEl: HTMLDivElement | null,
  count: number
) {
  const segmentSize = 1 / count;

  if (progressEl) {
    gsap.set(progressEl, { scaleY: progress, transformOrigin: "top" });
  }

  cards.forEach((card, i) => {
    const local = (progress - i * segmentSize) / segmentSize;

    if (local < 0 || local > 1) {
      gsap.set(card, { x: -SLIDE_OFFSET, opacity: 0 });
    } else if (local < ENTER_END) {
      const t = i === 0 ? Math.max(local / ENTER_END, 1) : local / ENTER_END;
      gsap.set(card, { x: -SLIDE_OFFSET + SLIDE_OFFSET * t, opacity: t });
    } else if (local < HOLD_END) {
      gsap.set(card, { x: 0, opacity: 1 });
    } else {
      const t = (local - HOLD_END) / (1 - HOLD_END);
      gsap.set(card, { x: -SLIDE_OFFSET * t, opacity: 1 - t });
    }
  });

  dots.forEach((dot, i) => {
    const local = (progress - i * segmentSize) / segmentSize;
    const active =
      i === 0 && progress < segmentSize * ENTER_END
        ? true
        : local >= ENTER_END * 0.5 && local <= HOLD_END + (1 - HOLD_END) * 0.5;
    gsap.set(dot, { scale: active ? 1.3 : 1, opacity: active ? 1 : 0.35 });
  });

  labels.forEach((label, i) => {
    const local = (progress - i * segmentSize) / segmentSize;
    const active =
      i === 0 && progress < segmentSize * ENTER_END
        ? true
        : local >= ENTER_END * 0.5 && local <= HOLD_END + (1 - HOLD_END) * 0.5;
    gsap.set(label, { opacity: active ? 1 : 0.35 });
  });
}

export function useExperienceScrollPin(refs: ExperienceScrollPinRefs) {
  const { outerRef, pinRef, progressRef, count } = refs;

  useLayoutEffect(() => {
    if (reducedMotion()) return;

    const outer = outerRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;

    if (!outer || !pin) return;

    const cards = pin.querySelectorAll<HTMLDivElement>(".experience-card");
    const dots = pin.querySelectorAll<HTMLDivElement>(".experience-timeline-dot");
    const labels = pin.querySelectorAll<HTMLSpanElement>(".experience-timeline-label");

    if (cards.length !== count) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const update = (p: number) =>
        applyScrollProgress(
          p,
          [...cards],
          [...dots],
          [...labels],
          progress,
          count
        );

      const st = ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: () => `+=${window.innerHeight * count}`,
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
  }, [count, outerRef, pinRef, progressRef]);
}
