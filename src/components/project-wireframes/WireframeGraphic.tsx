import { cn } from "@/lib/utils";

export type WireElement =
  | { type: "path"; d: string }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number }
  | { type: "rect"; x: number; y: number; width: number; height: number; rx?: number }
  | { type: "circle"; cx: number; cy: number; r: number };

type WireframeGraphicProps = {
  elements: WireElement[];
  className?: string;
  viewBox?: string;
};

// pathLength="1" normalises every element to length 1 so dasharray/dashoffset
// values of 1 always mean "the full length of this path", regardless of shape.
function renderElement(element: WireElement, index: number) {
  switch (element.type) {
    case "path":
      return <path key={index} data-wire d={element.d} pathLength="1" />;
    case "line":
      return <line key={index} data-wire x1={element.x1} y1={element.y1} x2={element.x2} y2={element.y2} pathLength="1" />;
    case "rect":
      return <rect key={index} data-wire x={element.x} y={element.y} width={element.width} height={element.height} rx={element.rx} pathLength="1" />;
    case "circle":
      return <circle key={index} data-wire cx={element.cx} cy={element.cy} r={element.r} pathLength="1" />;
  }
}

export function WireframeGraphic({
  elements,
  className,
  viewBox = "0 0 100 100",
}: WireframeGraphicProps) {
  return (
    <svg
      viewBox={viewBox}
      className={cn("wireframe-svg w-full h-full", className)}
      aria-hidden
    >
      {/* Always-visible grey base */}
      <g className="wireframe-base">{elements.map(renderElement)}</g>
      {/* White layer: draws in on hover, fades on leave */}
      <g className="wireframe-draw">{elements.map(renderElement)}</g>
    </svg>
  );
}
