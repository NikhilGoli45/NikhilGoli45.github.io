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

  const element = document.getElementById(sectionId);
  if (!element) return null;

  return element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
}

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = "smooth") {
  const attempt = (retries = 0) => {
    ScrollTrigger.refresh();
    const top = getSectionScrollTop(sectionId);
    const needsPinnedAbout =
      sectionId === "about" &&
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

    if (top === null) return;
    window.scrollTo({ top, behavior });
  };

  attempt();
}
