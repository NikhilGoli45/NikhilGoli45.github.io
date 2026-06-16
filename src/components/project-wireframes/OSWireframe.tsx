import { WireframeGraphic } from "./WireframeGraphic";

// CPU chip with 4 cores and bus pins — immediately recognizable as a processor
const elements = [
  // Chip package outline
  { type: "rect" as const, x: 52, y: 52, width: 96, height: 96, rx: 3 },
  // Four cores
  { type: "rect" as const, x: 62, y: 62, width: 34, height: 34, rx: 2 },
  { type: "rect" as const, x: 104, y: 62, width: 34, height: 34, rx: 2 },
  { type: "rect" as const, x: 62, y: 104, width: 34, height: 34, rx: 2 },
  { type: "rect" as const, x: 104, y: 104, width: 34, height: 34, rx: 2 },
  // Core 1 detail lines (text-like)
  { type: "line" as const, x1: 66, y1: 72, x2: 92, y2: 72 },
  { type: "line" as const, x1: 66, y1: 78, x2: 88, y2: 78 },
  { type: "line" as const, x1: 66, y1: 84, x2: 90, y2: 84 },
  // Core 2 detail lines
  { type: "line" as const, x1: 108, y1: 72, x2: 134, y2: 72 },
  { type: "line" as const, x1: 108, y1: 78, x2: 130, y2: 78 },
  { type: "line" as const, x1: 108, y1: 84, x2: 132, y2: 84 },
  // Core 3 detail lines
  { type: "line" as const, x1: 66, y1: 114, x2: 92, y2: 114 },
  { type: "line" as const, x1: 66, y1: 120, x2: 88, y2: 120 },
  { type: "line" as const, x1: 66, y1: 126, x2: 90, y2: 126 },
  // Core 4 detail lines
  { type: "line" as const, x1: 108, y1: 114, x2: 134, y2: 114 },
  { type: "line" as const, x1: 108, y1: 120, x2: 130, y2: 120 },
  { type: "line" as const, x1: 108, y1: 126, x2: 132, y2: 126 },
  // Top pins
  { type: "line" as const, x1: 66, y1: 52, x2: 66, y2: 44 },
  { type: "line" as const, x1: 76, y1: 52, x2: 76, y2: 44 },
  { type: "line" as const, x1: 86, y1: 52, x2: 86, y2: 44 },
  { type: "line" as const, x1: 100, y1: 52, x2: 100, y2: 44 },
  { type: "line" as const, x1: 110, y1: 52, x2: 110, y2: 44 },
  { type: "line" as const, x1: 120, y1: 52, x2: 120, y2: 44 },
  { type: "line" as const, x1: 130, y1: 52, x2: 130, y2: 44 },
  { type: "line" as const, x1: 140, y1: 52, x2: 140, y2: 44 },
  // Bottom pins
  { type: "line" as const, x1: 66, y1: 148, x2: 66, y2: 156 },
  { type: "line" as const, x1: 76, y1: 148, x2: 76, y2: 156 },
  { type: "line" as const, x1: 86, y1: 148, x2: 86, y2: 156 },
  { type: "line" as const, x1: 100, y1: 148, x2: 100, y2: 156 },
  { type: "line" as const, x1: 110, y1: 148, x2: 110, y2: 156 },
  { type: "line" as const, x1: 120, y1: 148, x2: 120, y2: 156 },
  { type: "line" as const, x1: 130, y1: 148, x2: 130, y2: 156 },
  { type: "line" as const, x1: 140, y1: 148, x2: 140, y2: 156 },
  // Left pins
  { type: "line" as const, x1: 52, y1: 66, x2: 44, y2: 66 },
  { type: "line" as const, x1: 52, y1: 76, x2: 44, y2: 76 },
  { type: "line" as const, x1: 52, y1: 86, x2: 44, y2: 86 },
  { type: "line" as const, x1: 52, y1: 100, x2: 44, y2: 100 },
  { type: "line" as const, x1: 52, y1: 110, x2: 44, y2: 110 },
  { type: "line" as const, x1: 52, y1: 120, x2: 44, y2: 120 },
  { type: "line" as const, x1: 52, y1: 130, x2: 44, y2: 130 },
  { type: "line" as const, x1: 52, y1: 140, x2: 44, y2: 140 },
  // Right pins
  { type: "line" as const, x1: 148, y1: 66, x2: 156, y2: 66 },
  { type: "line" as const, x1: 148, y1: 76, x2: 156, y2: 76 },
  { type: "line" as const, x1: 148, y1: 86, x2: 156, y2: 86 },
  { type: "line" as const, x1: 148, y1: 100, x2: 156, y2: 100 },
  { type: "line" as const, x1: 148, y1: 110, x2: 156, y2: 110 },
  { type: "line" as const, x1: 148, y1: 120, x2: 156, y2: 120 },
  { type: "line" as const, x1: 148, y1: 130, x2: 156, y2: 130 },
  { type: "line" as const, x1: 148, y1: 140, x2: 156, y2: 140 },
];

export function OSWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
