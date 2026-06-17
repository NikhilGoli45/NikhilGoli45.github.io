import { cn } from "@/lib/utils";
import { MICHIGAN_CREST_VIEWBOX, michiganCrestPaths } from "./michiganCrestPaths";

type MichiganCrestWireframeProps = {
  className?: string;
  drawn?: boolean;
};

function renderPaths() {
  return michiganCrestPaths.map(({ id, d }) => (
    <path key={id} data-wire d={d} fill="none" />
  ));
}

export function MichiganCrestWireframe({ className, drawn = false }: MichiganCrestWireframeProps) {
  return (
    <svg
      viewBox={MICHIGAN_CREST_VIEWBOX}
      className={cn("wireframe-svg education-crest", drawn && "education-crest-drawn", className)}
      aria-hidden
    >
      <g className="wireframe-draw">{renderPaths()}</g>
    </svg>
  );
}
