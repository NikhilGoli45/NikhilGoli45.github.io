import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./api";
import { photoUrl } from "../config";
import type { Pin } from "../types";

interface ManageCollectionProps {
  pin: Pin;
}

// Grid of a pin's photos with per-photo actions: pick the map cover, or
// remove the photo (two clicks — the second confirms) which also deletes
// the files from the bucket.
const ManageCollection = ({ pin }: ManageCollectionProps) => {
  const queryClient = useQueryClient();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const coverId = pin.cover ?? pin.photos[0]?.id;

  const mutate = async (photoId: string, path: string, body: unknown, okMsg: string) => {
    setBusyId(photoId);
    try {
      const res = await authFetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      toast.success(okMsg);
      await queryClient.invalidateQueries({ queryKey: ["photo-manifest"] });
    } catch {
      toast.error("That didn't stick — try again?");
    } finally {
      setBusyId(null);
      setConfirmingId(null);
    }
  };

  const setCover = (photoId: string) =>
    mutate(photoId, "/cover", { pinId: pin.id, photoId }, `${pin.name} has a new cover`);

  const removePhoto = (photoId: string) =>
    mutate(
      photoId,
      "/remove-photos",
      { pinId: pin.id, photoIds: [photoId] },
      "Photo removed from the journal"
    );

  return (
    <div className="flex flex-col gap-3">
      <p className="font-hand text-xl text-[#6b6252]">
        the ★ photo fronts the polaroid on the map
      </p>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {pin.photos.map((photo) => {
          const isCover = photo.id === coverId;
          const isBusy = busyId === photo.id;
          const isConfirming = confirmingId === photo.id;
          return (
            <li
              key={photo.id}
              className={`relative border bg-[#fffdf8] p-1 pb-8 shadow-sm ${
                isCover ? "border-[#a8503f]" : "border-[#2e2a22]/25"
              }`}
            >
              <img
                src={photoUrl(photo.thumb)}
                alt=""
                loading="lazy"
                className="aspect-square w-full bg-[#e9e2d2] object-cover"
              />
              {isCover && (
                <span className="caption absolute left-1 top-1 bg-[#a8503f] px-1.5 py-0.5 text-[10px] text-[#f7f3ea]">
                  cover
                </span>
              )}
              <span className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCover(photo.id)}
                  disabled={isBusy || isCover}
                  className="caption px-1 text-[#6b6252] hover:text-[#a8503f] disabled:opacity-40"
                  aria-label="Use as cover"
                  title="Use as cover"
                >
                  {isCover ? "★" : "☆"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    isConfirming ? removePhoto(photo.id) : setConfirmingId(photo.id)
                  }
                  onBlur={() => setConfirmingId((c) => (c === photo.id ? null : c))}
                  disabled={isBusy}
                  className={`caption px-1 disabled:opacity-40 ${
                    isConfirming
                      ? "bg-[#a8503f] text-[#f7f3ea]"
                      : "text-[#6b6252] hover:text-[#a8503f]"
                  }`}
                  aria-label="Remove photo"
                  title="Remove photo"
                >
                  {isBusy ? "…" : isConfirming ? "sure?" : "✕"}
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageCollection;
