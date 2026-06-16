import { WireframeGraphic } from "./WireframeGraphic";

// Email envelope (center) with circuit-line connections to recipient nodes + automated schedule clock
const elements = [
  // Central envelope body
  { type: "rect" as const, x: 42, y: 72, width: 116, height: 76, rx: 2 },
  // Envelope V-fold (flap crease)
  { type: "path" as const, d: "M42,72 L100,112 L158,72" },
  // Envelope bottom seam lines (detail)
  { type: "line" as const, x1: 42, y1: 125, x2: 158, y2: 125 },

  // Left recipient node
  { type: "circle" as const, cx: 18, cy: 110, r: 8 },
  // Right recipient node
  { type: "circle" as const, cx: 182, cy: 110, r: 8 },
  // Top recipient node
  { type: "circle" as const, cx: 100, cy: 28, r: 8 },
  // Bottom recipient node
  { type: "circle" as const, cx: 100, cy: 172, r: 8 },

  // Circuit connections (right-angle routing, Tron style)
  { type: "path" as const, d: "M26,110 L42,110" },
  { type: "path" as const, d: "M158,110 L174,110" },
  { type: "path" as const, d: "M100,72 L100,36" },
  { type: "path" as const, d: "M100,148 L100,164" },

  // Small junction dots at connection points on envelope
  { type: "circle" as const, cx: 42, cy: 110, r: 2 },
  { type: "circle" as const, cx: 158, cy: 110, r: 2 },
  { type: "circle" as const, cx: 100, cy: 72, r: 2 },
  { type: "circle" as const, cx: 100, cy: 148, r: 2 },

  // Automation clock (top-right corner)
  { type: "circle" as const, cx: 170, cy: 44, r: 18 },
  { type: "circle" as const, cx: 170, cy: 44, r: 2 },
  // Clock hands
  { type: "line" as const, x1: 170, y1: 44, x2: 170, y2: 32 },
  { type: "line" as const, x1: 170, y1: 44, x2: 180, y2: 50 },
  // Clock ticks
  { type: "line" as const, x1: 170, y1: 27, x2: 170, y2: 30 },
  { type: "line" as const, x1: 170, y1: 58, x2: 170, y2: 61 },
  { type: "line" as const, x1: 153, y1: 44, x2: 156, y2: 44 },
  { type: "line" as const, x1: 184, y1: 44, x2: 187, y2: 44 },
  // Clock to envelope connector
  { type: "path" as const, d: "M152,44 L140,44 L140,72" },

];

export function NAWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
