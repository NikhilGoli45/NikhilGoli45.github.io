import { useRef } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadQueue } from "./useUploadQueue";
import type { DraftPin } from "./PinPicker";

interface UploaderProps {
  pin: DraftPin | null;
}

const STATUS_LABEL: Record<string, string> = {
  pending: "waiting",
  processing: "developing…",
  done: "done ✓",
  error: "failed ✗",
};

const Uploader = ({ pin }: UploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { items, running, commitStatus, addFiles, removeItem, reset, uploadAll, commit } =
    useUploadQueue();

  const doneCount = items.filter((i) => i.status === "done").length;
  const canUpload = !!pin && items.length > 0 && !running && commitStatus !== "committing";

  const start = async () => {
    if (!pin) return;
    const { allUploaded, committed } = await uploadAll(pin);
    if (committed) {
      toast.success(`${pin.name} updated — the map has the new photos`);
      queryClient.invalidateQueries({ queryKey: ["photo-manifest"] });
      reset();
    } else if (!allUploaded) {
      toast.error("Some photos failed — retry the failed ones, then upload again");
    } else {
      toast.error("Photos uploaded but the map update failed — hit 'Retry commit'");
    }
  };

  const retryCommit = async () => {
    if (await commit()) {
      toast.success("Map updated");
      queryClient.invalidateQueries({ queryKey: ["photo-manifest"] });
      reset();
    } else {
      toast.error("Commit failed again");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={running}
        className="border border-dashed border-[#2e2a22]/50 px-6 py-8 text-[#6b6252] transition-colors hover:border-[#2e2a22] hover:text-[#2e2a22] disabled:opacity-50"
      >
        <span className="font-hand text-2xl">+ add photos</span>
        <span className="caption mt-1 block">JPEGs resize in your browser before upload</span>
      </button>

      {items.length > 0 && (
        <ul className="divide-y divide-[#2e2a22]/10 border border-[#2e2a22]/20 bg-[#fffdf8]">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-2">
              <span className="truncate text-sm text-[#2e2a22]">{item.file.name}</span>
              <span className="flex shrink-0 items-center gap-3">
                <span
                  className={`caption ${
                    item.status === "error"
                      ? "text-[#a8503f]"
                      : item.status === "done"
                        ? "text-[#4a5d3a]"
                        : "text-[#6b6252]"
                  }`}
                >
                  {STATUS_LABEL[item.status]}
                  {item.error ? ` — ${item.error}` : ""}
                </span>
                {!running && item.status !== "done" && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="caption text-[#6b6252] hover:text-[#a8503f]"
                    aria-label={`Remove ${item.file.name}`}
                  >
                    ✕
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={start}
          disabled={!canUpload}
          className="border border-[#2e2a22] px-6 py-2.5 text-[#2e2a22] transition-colors hover:bg-[#2e2a22] hover:text-[#f7f3ea] disabled:opacity-40"
        >
          {running
            ? `Developing… ${doneCount}/${items.length}`
            : items.some((i) => i.status === "error")
              ? "Retry failed & upload"
              : "Develop & upload"}
        </button>
        {commitStatus === "error" && (
          <button
            type="button"
            onClick={retryCommit}
            className="border border-[#a8503f] px-6 py-2.5 text-[#a8503f] transition-colors hover:bg-[#a8503f] hover:text-[#f7f3ea]"
          >
            Retry commit
          </button>
        )}
        {!pin && items.length > 0 && (
          <p className="font-hand text-xl text-[#a8503f]">pick a location first</p>
        )}
      </div>
    </div>
  );
};

export default Uploader;
