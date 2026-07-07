import { useMemo, useState } from "react";
import PaperMap from "../PaperMap";
import type { Pin } from "../types";

export type DraftPin = Omit<Pin, "photos">;

interface PinPickerProps {
  pins: Pin[];
  value: DraftPin | null;
  onChange: (pin: DraftPin | null) => void;
}

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const inputClass =
  "border border-[#2e2a22]/40 bg-[#fffdf8] px-3 py-2 text-[#2e2a22] placeholder:text-[#6b6252]/60 focus:outline-none focus:ring-1 focus:ring-[#2e2a22]";

const PinPicker = ({ pins, value, onChange }: PinPickerProps) => {
  const [mode, setMode] = useState<"existing" | "new">(pins.length > 0 ? "existing" : "new");
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [description, setDescription] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const emitNew = (
    next: Partial<{ name: string; emoji: string; description: string; coords: { lat: number; lng: number } | null }>
  ) => {
    const n = next.name ?? name;
    const c = next.coords !== undefined ? next.coords : coords;
    const e = next.emoji ?? emoji;
    const d = next.description ?? description;
    if (n.trim() && c) {
      onChange({
        id: slugify(n),
        name: n.trim(),
        lat: Number(c.lat.toFixed(5)),
        lng: Number(c.lng.toFixed(5)),
        emoji: e.trim() || undefined,
        description: d.trim() || undefined,
      });
    } else {
      onChange(null);
    }
  };

  // Show the in-progress pin on the picker map as a polaroid.
  const draftPins = useMemo<Pin[]>(
    () =>
      coords
        ? [
            {
              id: "draft",
              name: name.trim() || "new pin",
              lat: coords.lat,
              lng: coords.lng,
              emoji: emoji.trim() || undefined,
              photos: [],
            },
          ]
        : [],
    [coords, name, emoji]
  );

  const switchMode = (m: "existing" | "new") => {
    setMode(m);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => switchMode("existing")}
          disabled={pins.length === 0}
          className={`caption border px-4 py-2 transition-colors disabled:opacity-40 ${
            mode === "existing"
              ? "border-[#2e2a22] bg-[#2e2a22] text-[#f7f3ea]"
              : "border-[#2e2a22]/40 text-[#2e2a22]"
          }`}
        >
          Existing pin
        </button>
        <button
          type="button"
          onClick={() => switchMode("new")}
          className={`caption border px-4 py-2 transition-colors ${
            mode === "new"
              ? "border-[#2e2a22] bg-[#2e2a22] text-[#f7f3ea]"
              : "border-[#2e2a22]/40 text-[#2e2a22]"
          }`}
        >
          New location
        </button>
      </div>

      {mode === "existing" ? (
        <select
          value={value?.id ?? ""}
          onChange={(e) => {
            const pin = pins.find((p) => p.id === e.target.value);
            onChange(pin ? { ...pin } : null);
          }}
          className={inputClass}
        >
          <option value="">Choose a location…</option>
          {pins.map((p) => (
            <option key={p.id} value={p.id}>
              {p.emoji ? `${p.emoji} ` : ""}
              {p.name} ({p.photos.length} photos)
            </option>
          ))}
        </select>
      ) : (
        <>
          <p className="font-hand text-xl text-[#6b6252]">
            click the map to drop the pin, then name it
          </p>
          <PaperMap
            pins={draftPins}
            onPinClick={() => {}}
            onMapClick={(ll) => {
              setCoords(ll);
              emitNew({ coords: ll });
            }}
            fitToPins={false}
            className="h-64 w-full border border-[#2e2a22]/30 md:h-80"
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                emitNew({ name: e.target.value });
              }}
              placeholder="Location name (e.g. Kyoto, Japan)"
              className={inputClass}
            />
            <input
              value={emoji}
              onChange={(e) => {
                setEmoji(e.target.value);
                emitNew({ emoji: e.target.value });
              }}
              placeholder="Emoji (optional)"
              className={inputClass}
            />
            <input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                emitNew({ description: e.target.value });
              }}
              placeholder="Note (optional, e.g. Fall 2025)"
              className={`${inputClass} md:col-span-2`}
            />
          </div>
          <p className="caption text-[#6b6252]">
            {coords
              ? `pin at ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
              : "no pin dropped yet"}
          </p>
        </>
      )}
    </div>
  );
};

export default PinPicker;
