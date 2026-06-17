import { ScrollTrigger } from "gsap/ScrollTrigger";

export const NAV_OFFSET = 80;

export function getSectionScrollTop(sectionId: string): number | null {
  if (sectionId === "about") {
    ScrollTrigger.refresh();
    const st = ScrollTrigger.getById("about-pin");
    if (st) {
      return Math.max(st.start, st.end - 1);
    }
  }

  if (sectionId === "experience") {
    ScrollTrigger.refresh();
    const st = ScrollTrigger.getById("experience-pin");
    if (st) {
      return st.start;
    }
  }

  if (sectionId === "education") {
    ScrollTrigger.refresh();
    const st = ScrollTrigger.getById("education-pin");
    if (st) {
      // Crest finishes at the end of the scrubbed pin timeline.
      return Math.max(st.start, st.end - 1);
    }
  }

  if (sectionId === "projects") {
    ScrollTrigger.refresh();
    const st = ScrollTrigger.getById("projects-pin");
    if (st) {
      return st.start;
    }
    // Mobile / reduced-motion fallback (no pin): use element top with nav offset
    const element = document.getElementById("projects");
    if (!element) return null;
    return element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  }

  const element = document.getElementById(sectionId);
  if (!element) return null;

  return element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
}

export function getExperienceCardScrollTop(
  index: number,
  count: number
): number | null {
  ScrollTrigger.refresh();
  const st = ScrollTrigger.getById("experience-pin");
  if (!st) return null;

  const progress = count > 1 ? index / (count - 1) : 0;
  return st.start + progress * (st.end - st.start);
}

export function scrollToExperienceCard(
  index: number,
  count: number,
  behavior: ScrollBehavior = "smooth"
) {
  const attempt = (retries = 0) => {
    ScrollTrigger.refresh();
    const st = ScrollTrigger.getById("experience-pin");

    if (!st && document.getElementById("experience") && retries < 12) {
      requestAnimationFrame(() => attempt(retries + 1));
      return;
    }

    const top = getExperienceCardScrollTop(index, count);
    if (top === null) return;
    window.scrollTo({ top, behavior });
  };

  attempt();
}

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = "smooth") {
  const attempt = (retries = 0) => {
    ScrollTrigger.refresh();
    const top = getSectionScrollTop(sectionId);
    const needsPinnedAbout =
      sectionId === "about" &&
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const needsPinnedEducation =
      sectionId === "education" &&
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      needsPinnedAbout &&
      !ScrollTrigger.getById("about-pin") &&
      document.getElementById("about") &&
      retries < 12
    ) {
      requestAnimationFrame(() => attempt(retries + 1));
      return;
    }

    if (
      needsPinnedEducation &&
      !ScrollTrigger.getById("education-pin") &&
      document.getElementById("education") &&
      retries < 12
    ) {
      requestAnimationFrame(() => attempt(retries + 1));
      return;
    }

    if (top === null) return;

    if (sectionId === "education") {
      const st = ScrollTrigger.getById("education-pin");
      if (st?.animation) {
        st.animation.progress(1, true);
      }
    }

    window.scrollTo({ top, behavior });
  };

  attempt();
}
