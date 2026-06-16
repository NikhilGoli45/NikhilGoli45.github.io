import { WireframeGraphic } from "./WireframeGraphic";

// Algo trading price chart with buy/sell signal markers + competition podium
const elements = [
  // Chart axes
  { type: "line" as const, x1: 18, y1: 16, x2: 18, y2: 126 },
  { type: "line" as const, x1: 18, y1: 126, x2: 188, y2: 126 },
  // Y-axis ticks
  { type: "line" as const, x1: 14, y1: 40, x2: 18, y2: 40 },
  { type: "line" as const, x1: 14, y1: 65, x2: 18, y2: 65 },
  { type: "line" as const, x1: 14, y1: 90, x2: 18, y2: 90 },
  { type: "line" as const, x1: 14, y1: 115, x2: 18, y2: 115 },

  // Price line (volatile algo-trading chart)
  { type: "path" as const, d: "M18,95 L38,78 L58,102 L78,48 L98,72 L118,38 L138,60 L158,32 L178,55 L188,42" },

  // Buy signals (upward triangles below the line)
  { type: "path" as const, d: "M34,86 L38,78 L42,86 Z" },
  { type: "path" as const, d: "M94,80 L98,72 L102,80 Z" },
  { type: "path" as const, d: "M154,40 L158,32 L162,40 Z" },

  // Sell signals (downward triangles above the line)
  { type: "path" as const, d: "M54,94 L58,102 L62,94 Z" },
  { type: "path" as const, d: "M134,52 L138,60 L142,52 Z" },

  // P&L area (shaded region suggestion — dashed baseline reference)
  { type: "path" as const, d: "M18,80 L38,80 L58,80 L78,80 L98,80 L118,80 L138,80 L158,80 L188,80" },

  // Competition podium (bottom section) — centered under chart [x=18..188, center=103]
  { type: "rect" as const, x: 88, y: 150, width: 30, height: 34, rx: 1 },   // 1st place
  { type: "rect" as const, x: 122, y: 160, width: 28, height: 24, rx: 1 },  // 2nd place
  { type: "rect" as const, x: 56, y: 164, width: 28, height: 20, rx: 1 },   // 3rd place
  // Step lines connecting podium
  { type: "line" as const, x1: 84, y1: 164, x2: 88, y2: 164 },
  { type: "line" as const, x1: 118, y1: 160, x2: 122, y2: 160 },
  // Small star on 1st place (centered at x=103)
  { type: "path" as const, d: "M103,146 L105,142 L107,146 L102,143 L108,143 Z" },

];

export function IMCWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
