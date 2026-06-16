import { WireframeGraphic } from "./WireframeGraphic";

// Front-facing dog face with classification output labels — combines recognizable subject with ML output
const elements = [
  // Head circle
  { type: "circle" as const, cx: 90, cy: 100, r: 62 },
  // Left ear
  { type: "path" as const, d: "M38,68 L20,28 L68,56" },
  // Right ear
  { type: "path" as const, d: "M142,68 L160,28 L118,56" },
  // Left eye
  { type: "circle" as const, cx: 70, cy: 88, r: 10 },
  { type: "circle" as const, cx: 70, cy: 88, r: 4 },
  // Right eye
  { type: "circle" as const, cx: 110, cy: 88, r: 10 },
  { type: "circle" as const, cx: 110, cy: 88, r: 4 },
  // Snout / muzzle oval
  { type: "path" as const, d: "M68,112 Q90,130 112,112 Q118,100 112,90 Q90,86 68,90 Q62,100 68,112 Z" },
  // Nose
  { type: "path" as const, d: "M82,104 L90,100 L98,104 L90,108 Z" },
  // Mouth
  { type: "path" as const, d: "M80,116 Q90,124 100,116" },
  // Classification labels on right side
  { type: "rect" as const, x: 156, y: 74, width: 36, height: 10, rx: 1 },
  { type: "rect" as const, x: 156, y: 90, width: 30, height: 10, rx: 1 },
  { type: "rect" as const, x: 156, y: 106, width: 33, height: 10, rx: 1 },
  // Pointer from face to label (selected — top label)
  { type: "line" as const, x1: 148, y1: 88, x2: 156, y2: 79 },
];

export function DogClassifierWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
