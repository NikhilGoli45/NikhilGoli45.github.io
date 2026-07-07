interface Env {
  BUCKET: R2Bucket;
  ALLOWED_ORIGINS: string;
  PHOTO_UPLOAD_PASSWORD: string;
}

interface Photo {
  id: string;
  display: string;
  thumb: string;
  w: number;
  h: number;
  taken?: string;
  caption?: string;
}

interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  emoji?: string;
  description?: string;
  /** Photo id shown on the map pin; defaults to the first photo */
  cover?: string;
  photos: Photo[];
}

interface Manifest {
  version: number;
  updatedAt: string;
  pins: Pin[];
}

const MANIFEST_KEY = "manifest.json";
const PHOTO_KEY_RE = /^photos\/[a-z0-9-]+\/[a-z0-9-]+-(display|thumb)\.jpg$/;
const EMPTY_MANIFEST: Manifest = { version: 0, updatedAt: "", pins: [] };

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  return {
    "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0],
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Upload-Password",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

function isAuthorized(request: Request, env: Env): boolean {
  const password = request.headers.get("X-Upload-Password") ?? "";
  return password.length > 0 && timingSafeEqual(password, env.PHOTO_UPLOAD_PASSWORD);
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function readManifest(env: Env): Promise<Manifest> {
  const obj = await env.BUCKET.get(MANIFEST_KEY);
  if (!obj) return { ...EMPTY_MANIFEST, pins: [] };
  return (await obj.json()) as Manifest;
}

async function writeManifest(env: Env, manifest: Manifest): Promise<void> {
  manifest.version += 1;
  manifest.updatedAt = new Date().toISOString();
  await env.BUCKET.put(MANIFEST_KEY, JSON.stringify(manifest), {
    httpMetadata: { contentType: "application/json", cacheControl: "no-store" },
  });
}

interface CommitBody {
  pin: Omit<Pin, "photos">;
  photos: Photo[];
}

function isValidCommit(body: CommitBody): boolean {
  const { pin, photos } = body;
  if (!pin || typeof pin.id !== "string" || !/^[a-z0-9-]+$/.test(pin.id)) return false;
  if (typeof pin.name !== "string" || pin.name.length === 0 || pin.name.length > 120) return false;
  if (typeof pin.lat !== "number" || pin.lat < -90 || pin.lat > 90) return false;
  if (typeof pin.lng !== "number" || pin.lng < -180 || pin.lng > 180) return false;
  if (!Array.isArray(photos)) return false;
  return photos.every(
    (p) =>
      typeof p.id === "string" &&
      PHOTO_KEY_RE.test(p.display) &&
      PHOTO_KEY_RE.test(p.thumb) &&
      typeof p.w === "number" &&
      typeof p.h === "number"
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method === "GET" && pathname === "/manifest") {
      const manifest = await readManifest(env);
      return json(manifest, 200, cors);
    }

    // Serves images from the bucket. In production the site reads photos
    // straight from the R2 public URL; this route is what local dev uses,
    // since dev uploads land in miniflare's local bucket.
    if (request.method === "GET" && pathname.startsWith("/photo/")) {
      const key = decodeURIComponent(pathname.slice("/photo/".length));
      if (!PHOTO_KEY_RE.test(key)) {
        return json({ error: "invalid key" }, 400, cors);
      }
      const obj = await env.BUCKET.get(key);
      if (!obj) {
        return json({ error: "not found" }, 404, cors);
      }
      return new Response(obj.body, {
        headers: {
          ...cors,
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Everything below requires the upload password.
    if (!isAuthorized(request, env)) {
      return json({ error: "unauthorized" }, 401, cors);
    }

    if (request.method === "POST" && pathname === "/auth") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method === "PUT" && pathname.startsWith("/photo/")) {
      const key = decodeURIComponent(pathname.slice("/photo/".length));
      if (!PHOTO_KEY_RE.test(key)) {
        return json({ error: "invalid key" }, 400, cors);
      }
      if (!request.body) {
        return json({ error: "empty body" }, 400, cors);
      }
      await env.BUCKET.put(key, request.body, {
        httpMetadata: {
          contentType: "image/jpeg",
          cacheControl: "public, max-age=31536000, immutable",
        },
      });
      return json({ ok: true, key }, 200, cors);
    }

    if (request.method === "POST" && pathname === "/commit") {
      let body: CommitBody;
      try {
        body = (await request.json()) as CommitBody;
      } catch {
        return json({ error: "invalid json" }, 400, cors);
      }
      if (!isValidCommit(body)) {
        return json({ error: "invalid commit payload" }, 400, cors);
      }

      const manifest = await readManifest(env);
      const existing = manifest.pins.find((p) => p.id === body.pin.id);
      if (existing) {
        existing.name = body.pin.name;
        existing.lat = body.pin.lat;
        existing.lng = body.pin.lng;
        if (body.pin.emoji !== undefined) existing.emoji = body.pin.emoji;
        if (body.pin.description !== undefined) existing.description = body.pin.description;
        existing.photos.push(...body.photos);
      } else {
        manifest.pins.push({ ...body.pin, photos: body.photos });
      }
      await writeManifest(env, manifest);
      return json({ ok: true, version: manifest.version }, 200, cors);
    }

    if (request.method === "POST" && pathname === "/cover") {
      let body: { pinId?: string; photoId?: string };
      try {
        body = (await request.json()) as typeof body;
      } catch {
        return json({ error: "invalid json" }, 400, cors);
      }
      const manifest = await readManifest(env);
      const pin = manifest.pins.find((p) => p.id === body.pinId);
      if (!pin) return json({ error: "pin not found" }, 404, cors);
      if (!pin.photos.some((p) => p.id === body.photoId)) {
        return json({ error: "photo not found" }, 404, cors);
      }
      pin.cover = body.photoId;
      await writeManifest(env, manifest);
      return json({ ok: true, version: manifest.version }, 200, cors);
    }

    if (request.method === "POST" && pathname === "/remove-photos") {
      let body: { pinId?: string; photoIds?: string[] };
      try {
        body = (await request.json()) as typeof body;
      } catch {
        return json({ error: "invalid json" }, 400, cors);
      }
      if (!Array.isArray(body.photoIds) || body.photoIds.length === 0) {
        return json({ error: "photoIds required" }, 400, cors);
      }
      const manifest = await readManifest(env);
      const pin = manifest.pins.find((p) => p.id === body.pinId);
      if (!pin) return json({ error: "pin not found" }, 404, cors);

      const toRemove = new Set(body.photoIds);
      const removed = pin.photos.filter((p) => toRemove.has(p.id));
      if (removed.length === 0) return json({ error: "photo not found" }, 404, cors);

      pin.photos = pin.photos.filter((p) => !toRemove.has(p.id));
      if (pin.cover && toRemove.has(pin.cover)) delete pin.cover;

      await env.BUCKET.delete(removed.flatMap((p) => [p.display, p.thumb]));
      await writeManifest(env, manifest);
      return json({ ok: true, version: manifest.version, removed: removed.length }, 200, cors);
    }

    return json({ error: "not found" }, 404, cors);
  },
};
