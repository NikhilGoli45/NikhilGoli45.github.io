import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { photoUrl } from "./config";
import type { Pin } from "./types";

interface CollagePanelProps {
  pin: Pin;
  onClose: () => void;
}

const CollagePanel = ({ pin, onClose }: CollagePanelProps) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const lightboxOpen = lightboxIndex >= 0;

  // ESC unwinds one layer at a time: lightbox → collage → map. The lightbox
  // handles its own ESC, so this only closes the panel when it's on top.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightboxOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, onClose]);

  return (
    <div className="collage-panel paper-grain fixed inset-0 z-40 overflow-y-auto bg-[#f7f3ea]">
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <button
              onClick={onClose}
              className="caption link-underline mb-6 text-[#6b6252] hover:text-[#2e2a22]"
            >
              ← Back to map
            </button>
            <h1 className="font-display text-h2 uppercase leading-tight text-[#2e2a22]">
              {pin.name}
            </h1>
            {(pin.description || pin.emoji) && (
              <p className="font-hand mt-2 text-2xl text-[#6b6252]">
                {pin.emoji && <span className="mr-2">{pin.emoji}</span>}
                {pin.description}
              </p>
            )}
          </div>
          <div className="postmark mt-8 shrink-0" aria-hidden="true">
            <span className="text-2xl">{pin.photos.length}</span>
            <span className="text-sm">{pin.photos.length === 1 ? "photo" : "photos"}</span>
          </div>
        </div>

        <div className="mt-10 columns-2 gap-5 md:columns-3 lg:columns-4">
          {pin.photos.map((photo, i) => (
            <button
              key={photo.id}
              className="collage-photo"
              onClick={() => setLightboxIndex(i)}
              aria-label={photo.caption || `Photo ${i + 1} from ${pin.name}`}
            >
              <img
                src={photoUrl(photo.thumb)}
                alt={photo.caption ?? ""}
                width={photo.w}
                height={photo.h}
                loading="lazy"
                style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
              />
              {photo.caption && (
                <span className="font-hand mt-1 block text-lg leading-snug text-[#6b6252]">
                  {photo.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxIndex(-1)}
        index={Math.max(lightboxIndex, 0)}
        plugins={[Zoom]}
        slides={pin.photos.map((p) => ({
          src: photoUrl(p.display),
          width: p.w,
          height: p.h,
          description: p.caption,
        }))}
      />
    </div>
  );
};

export default CollagePanel;
