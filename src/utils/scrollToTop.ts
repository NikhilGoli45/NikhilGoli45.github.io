import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // On POP (browser back/forward or navigate(-1)), let Index.tsx restore position
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;