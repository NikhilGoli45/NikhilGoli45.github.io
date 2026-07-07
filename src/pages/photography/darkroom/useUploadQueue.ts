import { useCallback, useRef, useState } from "react";
import { authFetch } from "./api";
import { resizePhoto } from "./resize";
import type { Photo, Pin } from "../types";

export type ItemStatus = "pending" | "processing" | "done" | "error";

export interface QueueItem {
  id: string;
  file: File;
  status: ItemStatus;
  error?: string;
}

export type CommitStatus = "idle" | "committing" | "committed" | "error";

const CONCURRENCY = 3;

const newId = () => crypto.randomUUID().replace(/-/g, "").slice(0, 10);

export function useUploadQueue() {
  const [items, setItems] = useState<QueueItem[]>([]);
  const itemsRef = useRef<QueueItem[]>([]);
  const [running, setRunning] = useState(false);
  const [commitStatus, setCommitStatus] = useState<CommitStatus>("idle");
  const uploadedRef = useRef<Photo[]>([]);
  const pinRef = useRef<Omit<Pin, "photos"> | null>(null);

  const updateItems = (fn: (prev: QueueItem[]) => QueueItem[]) => {
    itemsRef.current = fn(itemsRef.current);
    setItems(itemsRef.current);
  };

  const setItemStatus = (id: string, status: ItemStatus, error?: string) =>
    updateItems((prev) => prev.map((it) => (it.id === id ? { ...it, status, error } : it)));

  const addFiles = useCallback((files: File[]) => {
    updateItems((prev) => [
      ...prev,
      ...files.map((file) => ({ id: newId(), file, status: "pending" as ItemStatus })),
    ]);
    setCommitStatus("idle");
  }, []);

  const removeItem = useCallback((id: string) => {
    updateItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const reset = useCallback(() => {
    updateItems(() => []);
    uploadedRef.current = [];
    pinRef.current = null;
    setCommitStatus("idle");
  }, []);

  const processItem = useCallback(async (item: QueueItem, pinId: string): Promise<boolean> => {
    try {
      setItemStatus(item.id, "processing");
      const resized = await resizePhoto(item.file);
      const photoId = newId();
      const displayKey = `photos/${pinId}/${photoId}-display.jpg`;
      const thumbKey = `photos/${pinId}/${photoId}-thumb.jpg`;

      for (const [key, blob] of [
        [displayKey, resized.displayBlob],
        [thumbKey, resized.thumbBlob],
      ] as const) {
        const res = await authFetch(`/photo/${key}`, { method: "PUT", body: blob });
        if (!res.ok) throw new Error(`upload failed (${res.status})`);
      }

      uploadedRef.current.push({
        id: photoId,
        display: displayKey,
        thumb: thumbKey,
        w: resized.w,
        h: resized.h,
      });
      setItemStatus(item.id, "done");
      return true;
    } catch (err) {
      setItemStatus(item.id, "error", err instanceof Error ? err.message : "failed");
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commit = useCallback(async (): Promise<boolean> => {
    const pin = pinRef.current;
    if (!pin || uploadedRef.current.length === 0) return false;
    setCommitStatus("committing");
    const res = await authFetch("/commit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin, photos: uploadedRef.current }),
    });
    if (!res.ok) {
      setCommitStatus("error");
      return false;
    }
    setCommitStatus("committed");
    uploadedRef.current = [];
    return true;
  }, []);

  /** Uploads every pending/failed item, then commits if everything succeeded. */
  const uploadAll = useCallback(
    async (pin: Omit<Pin, "photos">): Promise<{ allUploaded: boolean; committed: boolean }> => {
      pinRef.current = pin;
      setRunning(true);
      const queue = itemsRef.current.filter(
        (it) => it.status === "pending" || it.status === "error"
      );

      let next = 0;
      const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
        while (next < queue.length) {
          const item = queue[next++];
          await processItem(item, pin.id);
        }
      });
      await Promise.all(workers);
      setRunning(false);

      const allUploaded =
        itemsRef.current.length > 0 && itemsRef.current.every((it) => it.status === "done");
      const committed = allUploaded ? await commit() : false;
      return { allUploaded, committed };
    },
    [commit, processItem]
  );

  return { items, running, commitStatus, addFiles, removeItem, reset, uploadAll, commit };
}
