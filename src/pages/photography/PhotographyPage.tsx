import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaperMap from "./PaperMap";
import CollagePanel from "./CollagePanel";
import { useManifest } from "./useManifest";
import type { Pin } from "./types";
import "./photography.css";

// The main site hard-codes a near-black html background; swap it for paper
// while this page is mounted.
const usePaperBackground = () => {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.backgroundColor;
    root.style.backgroundColor = "#f7f3ea";
    return () => {
      root.style.backgroundColor = prev || "#0A0A0A";
    };
  }, []);
};

const PhotographyPage = () => {
  usePaperBackground();
  const { data, isLoading, isError } = useManifest();
  const [activePin, setActivePin] = useState<Pin | null>(null);

  const pins = data?.pins ?? [];

  return (
    <div className="photo-theme relative h-[100dvh] w-full overflow-hidden">
      <PaperMap pins={pins} onPinClick={setActivePin} className="absolute inset-0" />

      {/* Floating journal header */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-start justify-between p-5 md:p-8">
        <div>
          <h1 className="font-display text-lg uppercase tracking-widest text-[#2e2a22] md:text-xl">
            Nikhil Goli
          </h1>
          <p className="font-hand -mt-1 text-2xl text-[#a8503f] md:text-3xl">
            a photo journal
          </p>
        </div>
        <Link
          to="/"
          className="caption link-underline pointer-events-auto text-[#2e2a22]"
        >
          ← Portfolio
        </Link>
      </div>

      {/* Status notes, handwritten in the map's margin */}
      <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-10 flex justify-center">
        {isLoading && (
          <p className="font-hand text-2xl text-[#6b6252]">unfolding the map…</p>
        )}
        {isError && (
          <p className="font-hand text-2xl text-[#a8503f]">
            the map wouldn't load — try refreshing?
          </p>
        )}
        {!isLoading && !isError && pins.length === 0 && (
          <p className="font-hand text-2xl text-[#6b6252]">
            no pins yet — film still developing 🎞️
          </p>
        )}
        {!isLoading && pins.length > 0 && !activePin && (
          <p className="font-hand text-2xl text-[#6b6252]">
            tap a polaroid to open that page of the journal
          </p>
        )}
      </div>

      {activePin && <CollagePanel pin={activePin} onClose={() => setActivePin(null)} />}
    </div>
  );
};

export default PhotographyPage;
