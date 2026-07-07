import { useQuery } from "@tanstack/react-query";
import { WORKER_URL } from "./config";
import type { Manifest } from "./types";

export const useManifest = () =>
  useQuery<Manifest>({
    queryKey: ["photo-manifest"],
    queryFn: async () => {
      const res = await fetch(`${WORKER_URL}/manifest`);
      if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
      return res.json();
    },
    staleTime: 5 * 60_000,
  });
