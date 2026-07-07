import type { StyleSpecification, LayerSpecification } from "maplibre-gl";

export const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

const PAPER = "#f7f3ea";
const LAND_ALT = "#eee8d8";
const WATER = "#e4dcc8";
const ROAD = "#d8cfbb";
const BUILDING = "#eae3d1";
const BOUNDARY = "#b9ae94";
const TEXT = "#6b6252";

// Layers that add clutter the paper look doesn't want.
const DROP_RE = /poi|airport|aeroway|transit|ferry|housenum|oneway|shield|rail/i;

function patchLayer(layer: LayerSpecification): LayerSpecification | null {
  if (DROP_RE.test(layer.id)) return null;

  const patched = { ...layer, paint: { ...(layer.paint ?? {}) } } as LayerSpecification & {
    paint: Record<string, unknown>;
  };

  switch (layer.type) {
    case "background":
      patched.paint["background-color"] = PAPER;
      break;
    case "fill": {
      const isWater = /water|ocean|river|lake/i.test(layer.id);
      const isGreen = /landcover|landuse|park|wood|grass|sand|ice/i.test(layer.id);
      const isBuilding = /building/i.test(layer.id);
      patched.paint["fill-color"] = isWater
        ? WATER
        : isBuilding
          ? BUILDING
          : isGreen
            ? LAND_ALT
            : PAPER;
      if ("fill-outline-color" in patched.paint) {
        patched.paint["fill-outline-color"] = isWater ? WATER : LAND_ALT;
      }
      break;
    }
    case "line": {
      const isBoundary = /boundary|admin/i.test(layer.id);
      const isWater = /water|river/i.test(layer.id);
      patched.paint["line-color"] = isBoundary ? BOUNDARY : isWater ? WATER : ROAD;
      if (isBoundary) patched.paint["line-dasharray"] = [2, 2];
      break;
    }
    case "symbol":
      patched.paint["text-color"] = TEXT;
      patched.paint["text-halo-color"] = PAPER;
      patched.paint["text-halo-width"] = 1.2;
      break;
    case "fill-extrusion":
      return null;
    default:
      break;
  }
  return patched;
}

// Fetch the upstream style and recolor it to paper tones. Falls back to the
// unpatched style URL if the upstream schema surprises us.
export async function loadPaperStyle(): Promise<StyleSpecification | string> {
  try {
    const res = await fetch(STYLE_URL);
    if (!res.ok) throw new Error(`style fetch failed: ${res.status}`);
    const style = (await res.json()) as StyleSpecification;
    style.layers = style.layers
      .map(patchLayer)
      .filter((l): l is LayerSpecification => l !== null);
    return style;
  } catch (err) {
    console.warn("paper style patch failed, using upstream style", err);
    return STYLE_URL;
  }
}
