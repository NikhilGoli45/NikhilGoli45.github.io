import { WireframeGraphic } from "./WireframeGraphic";

// Three exchange order books with a routing node directing an order to best price
const elements = [
  // Exchange 1 order book (left)
  { type: "rect" as const, x: 8, y: 18, width: 40, height: 110, rx: 2 },
  { type: "line" as const, x1: 8, y1: 32, x2: 48, y2: 32 },
  { type: "line" as const, x1: 8, y1: 46, x2: 48, y2: 46 },
  { type: "line" as const, x1: 8, y1: 60, x2: 48, y2: 60 },
  { type: "line" as const, x1: 8, y1: 74, x2: 48, y2: 74 },
  { type: "line" as const, x1: 8, y1: 88, x2: 48, y2: 88 },
  { type: "line" as const, x1: 8, y1: 102, x2: 48, y2: 102 },
  { type: "line" as const, x1: 8, y1: 116, x2: 48, y2: 116 },
  { type: "line" as const, x1: 28, y1: 18, x2: 28, y2: 128 },

  // Exchange 2 order book (center)
  { type: "rect" as const, x: 80, y: 18, width: 40, height: 110, rx: 2 },
  { type: "line" as const, x1: 80, y1: 32, x2: 120, y2: 32 },
  { type: "line" as const, x1: 80, y1: 46, x2: 120, y2: 46 },
  { type: "line" as const, x1: 80, y1: 60, x2: 120, y2: 60 },
  { type: "line" as const, x1: 80, y1: 74, x2: 120, y2: 74 },
  { type: "line" as const, x1: 80, y1: 88, x2: 120, y2: 88 },
  { type: "line" as const, x1: 80, y1: 102, x2: 120, y2: 102 },
  { type: "line" as const, x1: 80, y1: 116, x2: 120, y2: 116 },
  { type: "line" as const, x1: 100, y1: 18, x2: 100, y2: 128 },

  // Exchange 3 order book (right)
  { type: "rect" as const, x: 152, y: 18, width: 40, height: 110, rx: 2 },
  { type: "line" as const, x1: 152, y1: 32, x2: 192, y2: 32 },
  { type: "line" as const, x1: 152, y1: 46, x2: 192, y2: 46 },
  { type: "line" as const, x1: 152, y1: 60, x2: 192, y2: 60 },
  { type: "line" as const, x1: 152, y1: 74, x2: 192, y2: 74 },
  { type: "line" as const, x1: 152, y1: 88, x2: 192, y2: 88 },
  { type: "line" as const, x1: 152, y1: 102, x2: 192, y2: 102 },
  { type: "line" as const, x1: 152, y1: 116, x2: 192, y2: 116 },
  { type: "line" as const, x1: 172, y1: 18, x2: 172, y2: 128 },

  // Incoming order box
  { type: "rect" as const, x: 80, y: 148, width: 40, height: 22, rx: 2 },
  { type: "line" as const, x1: 84, y1: 156, x2: 116, y2: 156 },
  { type: "line" as const, x1: 84, y1: 162, x2: 112, y2: 162 },

  // Routing lines from order to exchanges (right-angle)
  { type: "path" as const, d: "M100,148 L100,138 L28,138 L28,128" },
  { type: "path" as const, d: "M100,148 L100,128" },
  { type: "path" as const, d: "M100,148 L100,138 L172,138 L172,128" },

];

export function SORWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
