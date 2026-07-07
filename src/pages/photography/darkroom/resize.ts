export interface ResizedPhoto {
  displayBlob: Blob;
  thumbBlob: Blob;
  w: number; // display-version dimensions
  h: number;
}

const DISPLAY_EDGE = 2000;
const DISPLAY_QUALITY = 0.82;
const THUMB_EDGE = 400;
const THUMB_QUALITY = 0.75;

async function scaleToJpeg(
  bmp: ImageBitmap,
  maxEdge: number,
  quality: number
): Promise<{ blob: Blob; w: number; h: number }> {
  const scale = Math.min(1, maxEdge / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));

  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bmp, 0, 0, w, h);
    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality });
    return { blob, w, h };
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", quality)
  );
  return { blob, w, h };
}

export async function resizePhoto(file: File): Promise<ResizedPhoto> {
  // "from-image" bakes EXIF orientation into the bitmap so portrait phone
  // shots come out upright.
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  try {
    const display = await scaleToJpeg(bmp, DISPLAY_EDGE, DISPLAY_QUALITY);
    const thumb = await scaleToJpeg(bmp, THUMB_EDGE, THUMB_QUALITY);
    return { displayBlob: display.blob, thumbBlob: thumb.blob, w: display.w, h: display.h };
  } finally {
    bmp.close();
  }
}
