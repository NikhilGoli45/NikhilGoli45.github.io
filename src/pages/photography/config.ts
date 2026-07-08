// Cloudflare endpoints for the photography portfolio.
// After deploying the Worker (`npm run worker:deploy`) and enabling r2.dev
// public access on the bucket, replace the placeholder hosts below.
export const WORKER_URL = import.meta.env.DEV
  ? "http://localhost:8787"
  : "https://photo-api.golinikhil1.workers.dev";

// Public base URL for image keys stored in the manifest. Keys, not full URLs,
// live in the manifest so this can later switch to photos.nikhilgoli.com.
export const R2_PUBLIC_BASE = "https://pub-814be7b80db9447f810ccad7ff9da9fc.r2.dev/";

// Dev photos live in miniflare's local bucket, so only the local worker can
// serve them; production reads straight from the R2 public host.
export const photoUrl = (key: string) =>
  import.meta.env.DEV ? `${WORKER_URL}/photo/${key}` : `${R2_PUBLIC_BASE}${key}`;
