import { WireframeGraphic } from "./WireframeGraphic";

// Two dice showing clear pips + a market spread bid/ask below
const elements = [
  // Die 1 (left)
  { type: "rect" as const, x: 18, y: 30, width: 68, height: 68, rx: 6 },
  // Die 1 pips — 5 (quincunx pattern)
  { type: "circle" as const, cx: 34, cy: 46, r: 5 },
  { type: "circle" as const, cx: 70, cy: 46, r: 5 },
  { type: "circle" as const, cx: 52, cy: 64, r: 5 },
  { type: "circle" as const, cx: 34, cy: 82, r: 5 },
  { type: "circle" as const, cx: 70, cy: 82, r: 5 },

  // Die 2 (right)
  { type: "rect" as const, x: 114, y: 30, width: 68, height: 68, rx: 6 },
  // Die 2 pips — 3 (diagonal)
  { type: "circle" as const, cx: 128, cy: 44, r: 5 },
  { type: "circle" as const, cx: 148, cy: 64, r: 5 },
  { type: "circle" as const, cx: 168, cy: 84, r: 5 },

  // Market spread section below — axis
  { type: "line" as const, x1: 18, y1: 158, x2: 182, y2: 158 },
  // Bid side (left bars — decreasing)
  { type: "rect" as const, x: 18, y: 138, width: 14, height: 20 },
  { type: "rect" as const, x: 36, y: 144, width: 14, height: 14 },
  { type: "rect" as const, x: 54, y: 148, width: 14, height: 10 },
  { type: "rect" as const, x: 72, y: 152, width: 14, height: 6 },
  // Ask side (right bars — increasing)
  { type: "rect" as const, x: 114, y: 152, width: 14, height: 6 },
  { type: "rect" as const, x: 132, y: 148, width: 14, height: 10 },
  { type: "rect" as const, x: 150, y: 144, width: 14, height: 14 },
  { type: "rect" as const, x: 168, y: 138, width: 14, height: 20 },
  // Spread gap marker
  { type: "line" as const, x1: 86, y1: 148, x2: 114, y2: 148 },
  { type: "line" as const, x1: 86, y1: 145, x2: 86, y2: 162 },
  { type: "line" as const, x1: 114, y1: 145, x2: 114, y2: 162 },

];

export function WagerWarsWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
