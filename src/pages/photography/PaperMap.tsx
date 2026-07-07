import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { loadPaperStyle } from "./paper-style";
import { photoUrl } from "./config";
import type { Pin } from "./types";

interface PaperMapProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  /** Fired on map click when picking a location (darkroom's new-pin mode) */
  onMapClick?: (lngLat: { lng: number; lat: number }) => void;
  className?: string;
  /** When false, pins render nothing and the map is just a location picker */
  interactivePins?: boolean;
  /** Skip the initial fitBounds (darkroom picker keeps the world view) */
  fitToPins?: boolean;
}

// Deterministic small tilt per pin so the polaroids look hand-placed.
const tiltFor = (id: string) => {
  let hash = 0;
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return `${(Math.abs(hash) % 9) - 4}deg`;
};

// The returned wrapper becomes the MapLibre marker element, which the map
// repositions via `transform` every frame — it must stay free of the pin's
// CSS transitions/transforms, so those live on the inner button instead.
function buildPinElement(pin: Pin, onClick: () => void): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "photo-pin-marker";

  const el = document.createElement("button");
  el.type = "button";
  el.className = "photo-pin";
  el.style.setProperty("--pin-tilt", tiltFor(pin.id));
  el.setAttribute("aria-label", `View photos from ${pin.name}`);

  const cover = pin.photos.find((p) => p.id === pin.cover) ?? pin.photos[0];
  if (cover) {
    const img = document.createElement("img");
    img.src = photoUrl(cover.thumb);
    img.alt = "";
    img.loading = "lazy";
    el.appendChild(img);
  } else {
    const emoji = document.createElement("div");
    emoji.className = "photo-pin-emoji";
    emoji.textContent = pin.emoji || "📷";
    el.appendChild(emoji);
  }

  const label = document.createElement("span");
  label.className = "photo-pin-label";
  label.textContent = `${pin.emoji ? pin.emoji + " " : ""}${pin.name}`;
  el.appendChild(label);

  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick();
  });
  wrapper.appendChild(el);
  return wrapper;
}

const PaperMap = ({
  pins,
  onPinClick,
  onMapClick,
  className,
  interactivePins = true,
  fitToPins = true,
}: PaperMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const hasFitRef = useRef(false);

  const onMapClickRef = useRef(onMapClick);
  onMapClickRef.current = onMapClick;
  const onPinClickRef = useRef(onPinClick);
  onPinClickRef.current = onPinClick;

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    loadPaperStyle().then((style) => {
      if (cancelled || !containerRef.current) return;
      const map = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: [10, 25],
        zoom: 1.6,
        maxZoom: 15,
        attributionControl: { compact: true },
      });
      map.on("click", (e) => onMapClickRef.current?.(e.lngLat));
      mapRef.current = map;
      setMapReady(true);
    });

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = interactivePins
      ? pins.map((pin) =>
          new maplibregl.Marker({
            element: buildPinElement(pin, () => onPinClickRef.current(pin)),
          })
            .setLngLat([pin.lng, pin.lat])
            .addTo(map)
        )
      : [];

    if (!fitToPins || hasFitRef.current || pins.length === 0) return;
    hasFitRef.current = true;
    if (pins.length > 1) {
      const bounds = new maplibregl.LngLatBounds();
      pins.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 100, maxZoom: 6, duration: 1200 });
    } else {
      map.flyTo({ center: [pins[0].lng, pins[0].lat], zoom: 4, duration: 1200 });
    }
  }, [pins, interactivePins, fitToPins, mapReady]);

  // MapLibre stamps `position: relative` onto its container element, which
  // would fight positioning utility classes — keep those on an outer wrapper.
  return (
    <div className={className}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};

export default PaperMap;
