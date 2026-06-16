import { WireframeGraphic } from "./WireframeGraphic";

// Two database tables with a JOIN connector — classic SQL schema diagram
const elements = [
  // Table 1 (left)
  { type: "rect" as const, x: 10, y: 40, width: 72, height: 120, rx: 2 },
  // Table 1 header row
  { type: "line" as const, x1: 10, y1: 58, x2: 82, y2: 58 },
  // Table 1 column divider
  { type: "line" as const, x1: 42, y1: 40, x2: 42, y2: 160 },
  // Table 1 rows
  { type: "line" as const, x1: 10, y1: 76, x2: 82, y2: 76 },
  { type: "line" as const, x1: 10, y1: 94, x2: 82, y2: 94 },
  { type: "line" as const, x1: 10, y1: 112, x2: 82, y2: 112 },
  { type: "line" as const, x1: 10, y1: 130, x2: 82, y2: 130 },
  { type: "line" as const, x1: 10, y1: 148, x2: 82, y2: 148 },
  // Table 1 header content lines
  { type: "line" as const, x1: 15, y1: 50, x2: 38, y2: 50 },
  { type: "line" as const, x1: 46, y1: 50, x2: 78, y2: 50 },
  // Table 1 row content (id column — short lines = numbers)
  { type: "line" as const, x1: 18, y1: 68, x2: 34, y2: 68 },
  { type: "line" as const, x1: 18, y1: 86, x2: 34, y2: 86 },
  { type: "line" as const, x1: 18, y1: 104, x2: 34, y2: 104 },
  { type: "line" as const, x1: 18, y1: 122, x2: 34, y2: 122 },
  { type: "line" as const, x1: 18, y1: 140, x2: 34, y2: 140 },
  // Table 1 row content (value column)
  { type: "line" as const, x1: 46, y1: 68, x2: 76, y2: 68 },
  { type: "line" as const, x1: 46, y1: 86, x2: 74, y2: 86 },
  { type: "line" as const, x1: 46, y1: 104, x2: 72, y2: 104 },
  { type: "line" as const, x1: 46, y1: 122, x2: 75, y2: 122 },
  { type: "line" as const, x1: 46, y1: 140, x2: 70, y2: 140 },
  // Primary key marker (small diamond on row 1)
  { type: "path" as const, d: "M24,62 L27,65 L24,68 L21,65 Z" },

  // Table 2 (right)
  { type: "rect" as const, x: 118, y: 40, width: 72, height: 120, rx: 2 },
  // Table 2 header row
  { type: "line" as const, x1: 118, y1: 58, x2: 190, y2: 58 },
  // Table 2 column divider
  { type: "line" as const, x1: 150, y1: 40, x2: 150, y2: 160 },
  // Table 2 rows
  { type: "line" as const, x1: 118, y1: 76, x2: 190, y2: 76 },
  { type: "line" as const, x1: 118, y1: 94, x2: 190, y2: 94 },
  { type: "line" as const, x1: 118, y1: 112, x2: 190, y2: 112 },
  { type: "line" as const, x1: 118, y1: 130, x2: 190, y2: 130 },
  { type: "line" as const, x1: 118, y1: 148, x2: 190, y2: 148 },
  // Table 2 headers
  { type: "line" as const, x1: 122, y1: 50, x2: 146, y2: 50 },
  { type: "line" as const, x1: 154, y1: 50, x2: 186, y2: 50 },
  // Table 2 row content
  { type: "line" as const, x1: 125, y1: 68, x2: 142, y2: 68 },
  { type: "line" as const, x1: 125, y1: 86, x2: 142, y2: 86 },
  { type: "line" as const, x1: 125, y1: 104, x2: 142, y2: 104 },
  { type: "line" as const, x1: 154, y1: 68, x2: 184, y2: 68 },
  { type: "line" as const, x1: 154, y1: 86, x2: 180, y2: 86 },
  { type: "line" as const, x1: 154, y1: 104, x2: 182, y2: 104 },
  // Foreign key marker (small diamond)
  { type: "path" as const, d: "M132,62 L135,65 L132,68 L129,65 Z" },

  // JOIN connector (right-angle path between primary/foreign keys)
  { type: "path" as const, d: "M82,65 L100,65 L100,65 L118,65" },
  // JOIN node
  { type: "circle" as const, cx: 100, cy: 65, r: 4 },
  // JOIN label lines (tiny)
  { type: "line" as const, x1: 90, y1: 170, x2: 110, y2: 170 },
  { type: "line" as const, x1: 90, y1: 176, x2: 105, y2: 176 },
  { type: "line" as const, x1: 90, y1: 182, x2: 108, y2: 182 },

];

export function SQLWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
