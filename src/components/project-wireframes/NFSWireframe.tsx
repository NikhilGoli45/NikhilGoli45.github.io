import { WireframeGraphic } from "./WireframeGraphic";

// Server rack (center) with two client terminals connected via network lines
const elements = [
  // Server rack body
  { type: "rect" as const, x: 76, y: 28, width: 48, height: 116, rx: 2 },
  // Drive bay dividers
  { type: "line" as const, x1: 80, y1: 46, x2: 120, y2: 46 },
  { type: "line" as const, x1: 80, y1: 62, x2: 120, y2: 62 },
  { type: "line" as const, x1: 80, y1: 78, x2: 120, y2: 78 },
  { type: "line" as const, x1: 80, y1: 94, x2: 120, y2: 94 },
  { type: "line" as const, x1: 80, y1: 110, x2: 120, y2: 110 },
  { type: "line" as const, x1: 80, y1: 126, x2: 120, y2: 126 },
  // LED indicators per bay
  { type: "circle" as const, cx: 116, cy: 46, r: 3 },
  { type: "circle" as const, cx: 116, cy: 62, r: 3 },
  { type: "circle" as const, cx: 116, cy: 78, r: 3 },
  { type: "circle" as const, cx: 116, cy: 94, r: 3 },
  { type: "circle" as const, cx: 116, cy: 110, r: 3 },
  { type: "circle" as const, cx: 116, cy: 126, r: 3 },
  // Rack base/feet
  { type: "rect" as const, x: 70, y: 144, width: 60, height: 8, rx: 1 },
  { type: "line" as const, x1: 84, y1: 152, x2: 84, y2: 162 },
  { type: "line" as const, x1: 116, y1: 152, x2: 116, y2: 162 },
  // Left client monitor
  { type: "rect" as const, x: 14, y: 62, width: 44, height: 32, rx: 1 },
  { type: "line" as const, x1: 18, y1: 74, x2: 54, y2: 74 },
  { type: "line" as const, x1: 18, y1: 82, x2: 50, y2: 82 },
  { type: "line" as const, x1: 36, y1: 94, x2: 36, y2: 108 },
  { type: "line" as const, x1: 24, y1: 108, x2: 48, y2: 108 },
  // Right client monitor
  { type: "rect" as const, x: 142, y: 62, width: 44, height: 32, rx: 1 },
  { type: "line" as const, x1: 146, y1: 74, x2: 182, y2: 74 },
  { type: "line" as const, x1: 146, y1: 82, x2: 178, y2: 82 },
  { type: "line" as const, x1: 164, y1: 94, x2: 164, y2: 108 },
  { type: "line" as const, x1: 152, y1: 108, x2: 176, y2: 108 },
  // Network cable lines (right-angle routing)
  { type: "path" as const, d: "M58,78 L76,78" },
  { type: "path" as const, d: "M124,78 L142,78" },
  // Data packet squares on cables
  { type: "rect" as const, x: 62, y: 74, width: 8, height: 8, rx: 1 },
  { type: "rect" as const, x: 130, y: 74, width: 8, height: 8, rx: 1 },
];

export function NFSWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
