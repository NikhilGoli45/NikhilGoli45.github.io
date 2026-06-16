import { WireframeGraphic } from "./WireframeGraphic";

// Candlestick chart — immediately recognizable as financial trading
const elements = [
  // Chart axes
  { type: "line" as const, x1: 22, y1: 18, x2: 22, y2: 148 },
  { type: "line" as const, x1: 22, y1: 148, x2: 188, y2: 148 },
  // Y-axis tick marks
  { type: "line" as const, x1: 18, y1: 40, x2: 22, y2: 40 },
  { type: "line" as const, x1: 18, y1: 65, x2: 22, y2: 65 },
  { type: "line" as const, x1: 18, y1: 90, x2: 22, y2: 90 },
  { type: "line" as const, x1: 18, y1: 115, x2: 22, y2: 115 },
  // Subtle horizontal grid lines
  { type: "line" as const, x1: 22, y1: 40, x2: 188, y2: 40 },
  { type: "line" as const, x1: 22, y1: 90, x2: 188, y2: 90 },

  // Candle 1 — bullish (close > open, tall rect)
  { type: "line" as const, x1: 42, y1: 48, x2: 42, y2: 36 },   // upper wick
  { type: "rect" as const, x: 36, y: 60, width: 12, height: 32 },
  { type: "line" as const, x1: 42, y1: 92, x2: 42, y2: 104 },   // lower wick

  // Candle 2 — bearish (open > close, short rect)
  { type: "line" as const, x1: 68, y1: 54, x2: 68, y2: 44 },
  { type: "rect" as const, x: 62, y: 66, width: 12, height: 20 },
  { type: "line" as const, x1: 68, y1: 86, x2: 68, y2: 98 },

  // Candle 3 — bullish (tall)
  { type: "line" as const, x1: 94, y1: 42, x2: 94, y2: 30 },
  { type: "rect" as const, x: 88, y: 52, width: 12, height: 38 },
  { type: "line" as const, x1: 94, y1: 90, x2: 94, y2: 110 },

  // Candle 4 — bearish doji (very short body)
  { type: "line" as const, x1: 120, y1: 46, x2: 120, y2: 34 },
  { type: "rect" as const, x: 114, y: 56, width: 12, height: 10 },
  { type: "line" as const, x1: 120, y1: 66, x2: 120, y2: 80 },

  // Candle 5 — bullish (medium)
  { type: "line" as const, x1: 146, y1: 36, x2: 146, y2: 26 },
  { type: "rect" as const, x: 140, y: 46, width: 12, height: 30 },
  { type: "line" as const, x1: 146, y1: 76, x2: 146, y2: 92 },

  // Candle 6 — bullish (tall, rightmost)
  { type: "line" as const, x1: 172, y1: 28, x2: 172, y2: 18 },
  { type: "rect" as const, x: 166, y: 38, width: 12, height: 40 },
  { type: "line" as const, x1: 172, y1: 78, x2: 172, y2: 98 },

  // Volume bars at bottom
  { type: "rect" as const, x: 36, y: 158, width: 12, height: 20 },
  { type: "rect" as const, x: 62, y: 164, width: 12, height: 14 },
  { type: "rect" as const, x: 88, y: 155, width: 12, height: 23 },
  { type: "rect" as const, x: 114, y: 168, width: 12, height: 10 },
  { type: "rect" as const, x: 140, y: 160, width: 12, height: 18 },
  { type: "rect" as const, x: 166, y: 152, width: 12, height: 26 },

];

export function ETFWireframe() {
  return <WireframeGraphic elements={elements} viewBox="0 0 200 200" />;
}
