import { WireframeGraphic } from "./WireframeGraphic";

// Forum post document flowing through a Naive Bayes classifier to output category labels
const elements = [
  // Input document (left)
  { type: "rect" as const, x: 10, y: 28, width: 60, height: 78, rx: 2 },
  // Document text lines (simulate forum post words)
  { type: "line" as const, x1: 16, y1: 42, x2: 64, y2: 42 },
  { type: "line" as const, x1: 16, y1: 50, x2: 60, y2: 50 },
  { type: "line" as const, x1: 16, y1: 58, x2: 62, y2: 58 },
  { type: "line" as const, x1: 16, y1: 66, x2: 56, y2: 66 },
  { type: "line" as const, x1: 16, y1: 74, x2: 64, y2: 74 },
  { type: "line" as const, x1: 16, y1: 82, x2: 58, y2: 82 },
  { type: "line" as const, x1: 16, y1: 90, x2: 60, y2: 90 },
  { type: "line" as const, x1: 16, y1: 98, x2: 52, y2: 98 },
  // Arrow from document to classifier
  { type: "path" as const, d: "M70,67 L90,67" },
  { type: "path" as const, d: "M86,63 L90,67 L86,71" },

  // Classifier diamond (Naive Bayes engine)
  { type: "path" as const, d: "M100,50 L122,67 L100,84 L78,67 Z" },
  // Inner detail of classifier
  { type: "path" as const, d: "M93,67 L107,67 M100,60 L100,74" },

  // Arrows fanning out to category labels
  { type: "path" as const, d: "M122,67 L140,40" },
  { type: "path" as const, d: "M122,67 L140,67" },
  { type: "path" as const, d: "M122,67 L140,94" },

  // Category label boxes (right)
  { type: "rect" as const, x: 140, y: 30, width: 50, height: 18, rx: 2 },
  { type: "rect" as const, x: 140, y: 58, width: 50, height: 18, rx: 2 },
  { type: "rect" as const, x: 140, y: 86, width: 50, height: 18, rx: 2 },
  // Label text lines
  { type: "line" as const, x1: 146, y1: 39, x2: 184, y2: 39 },
  { type: "line" as const, x1: 146, y1: 67, x2: 180, y2: 67 },
  { type: "line" as const, x1: 146, y1: 95, x2: 178, y2: 95 },

  // Probability bars below each label (confidence scores)
  { type: "rect" as const, x: 140, y: 52, width: 40, height: 4, rx: 1 },
  { type: "rect" as const, x: 140, y: 80, width: 22, height: 4, rx: 1 },
  { type: "rect" as const, x: 140, y: 108, width: 12, height: 4, rx: 1 },

];

export function ForumWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
