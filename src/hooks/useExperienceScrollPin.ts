import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MIN_SCALE = 0.94;
const MAX_SCALE = 1;
const ARC_SPAN_DEG = 22;
const HOLD_ZONE = 0.22;
const TRANSITION_Y_PUSH = 0.08;
// Brief plateau at each card focus while scroll continues smoothly
const LOCK_FRACTION = 0.12;
// Timeline highlights only when a card is seated at 3 o'clock
const FOCUS_THRESHOLD = 0.08;

interface ExperienceScrollPinRefs {
  outerRef: RefObject<HTMLDivElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  progressRef: RefObject<HTMLDivElement | null>;
  count: number;
}

function getWheelRadius(): number {
  return Math.max(window.innerHeight * 1.45, 1100);
}

function getWheelGeometry() {
  const radius = getWheelRadius();
  return { radius, offsetX: -radius };
}

function getCardOffset(progress: number, index: number, count: number): number {
  const wheelOffset = progress * (count - 1);
  return wheelOffset - index;
}

function getCardVisibility(offset: number): number {
  const distance = Math.abs(offset);
  if (distance >= 1) return 0;
  if (distance <= HOLD_ZONE) return 1;
  const t = (distance - HOLD_ZONE) / (1 - HOLD_ZONE);
  return Math.pow(1 - t, 2.2);
}

function getCardTheta(offset: number): number {
  const arcSpanRad = (ARC_SPAN_DEG * Math.PI) / 180;
  return -offset * arcSpanRad;
}

function getCardPosition(
  offset: number,
  radius: number,
  offsetX: number
): { theta: number; x: number; y: number } {
  const theta = getCardTheta(offset);
  const transitionSpread =
    -Math.sign(offset) *
    radius *
    TRANSITION_Y_PUSH *
    Math.sin(Math.min(Math.abs(offset), 1) * Math.PI);

  return {
    theta,
    x: offsetX + radius * Math.cos(theta),
    y: radius * Math.sin(theta) + transitionSpread,
  };
}

function mapScrollToVisualProgress(scrollProgress: number, count: number): number {
  if (count <= 1) return scrollProgress;

  const segments = count - 1;
  const pos = scrollProgress * segments;
  const segmentIndex = Math.min(Math.floor(pos), segments - 1);
  const local = pos - segmentIndex;
  const visualStart = segmentIndex / segments;
  const visualEnd = (segmentIndex + 1) / segments;

  if (local <= LOCK_FRACTION) return visualStart;

  const t = (local - LOCK_FRACTION) / (1 - LOCK_FRACTION);
  return visualStart + (visualEnd - visualStart) * t;
}

function getFocusedCardIndex(
  visualProgress: number,
  count: number
): number | null {
  if (count <= 1) return 0;

  let focusedIndex: number | null = null;
  let minOffset = FOCUS_THRESHOLD + 1;

  for (let i = 0; i < count; i++) {
    const distance = Math.abs(getCardOffset(visualProgress, i, count));
    if (distance <= FOCUS_THRESHOLD && distance < minOffset) {
      minOffset = distance;
      focusedIndex = i;
    }
  }

  return focusedIndex;
}

function applyScrollProgress(
  scrollProgress: number,
  cards: HTMLDivElement[],
  dots: HTMLDivElement[],
  labels: HTMLSpanElement[],
  progressEl: HTMLDivElement | null,
  count: number
) {
  const visualProgress = mapScrollToVisualProgress(scrollProgress, count);
  const focusedIndex = getFocusedCardIndex(visualProgress, count);
  const { radius, offsetX } = getWheelGeometry();

  if (progressEl) {
    gsap.set(progressEl, { scaleY: scrollProgress, transformOrigin: "top" });
  }

  cards.forEach((card, i) => {
    const offset = getCardOffset(visualProgress, i, count);
    const { theta, x, y } = getCardPosition(offset, radius, offsetX);
    const visibility = getCardVisibility(offset);
    const rotationDeg = (theta * 180) / Math.PI;

    gsap.set(card, {
      x,
      y,
      rotation: rotationDeg,
      scale: MIN_SCALE + (MAX_SCALE - MIN_SCALE) * visibility,
      opacity: visibility,
      zIndex: Math.round(visibility * 100),
      transformOrigin: "center center",
    });
  });

  dots.forEach((dot, i) => {
    const active = focusedIndex !== null && i === focusedIndex;
    gsap.set(dot, { scale: active ? 1.3 : 1, opacity: active ? 1 : 0.35 });
  });

  labels.forEach((label, i) => {
    const active = focusedIndex !== null && i === focusedIndex;
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
        id: "experience-pin",
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
