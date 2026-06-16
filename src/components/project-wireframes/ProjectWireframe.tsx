import type { FC } from "react";
import { cn } from "@/lib/utils";
import { DogClassifierWireframe } from "./DogClassifierWireframe";
import { ETFWireframe } from "./ETFWireframe";
import { ForumWireframe } from "./ForumWireframe";
import { IMCWireframe } from "./IMCWireframe";
import { NAWireframe } from "./NAWireframe";
import { NFSWireframe } from "./NFSWireframe";
import { OSWireframe } from "./OSWireframe";
import { SORWireframe } from "./SORWireframe";
import { SQLWireframe } from "./SQLWireframe";
import { WagerWarsWireframe } from "./WagerWarsWireframe";

const wireframes: Record<string, FC> = {
  NA: NAWireframe,
  NFS: NFSWireframe,
  WagerWars: WagerWarsWireframe,
  OS: OSWireframe,
  DogClassifier: DogClassifierWireframe,
  SOR: SORWireframe,
  ETF: ETFWireframe,
  IMC: IMCWireframe,
  SQL: SQLWireframe,
  Forum: ForumWireframe,
};

type ProjectWireframeProps = {
  id: string;
  className?: string;
};

export function ProjectWireframe({ id, className }: ProjectWireframeProps) {
  const Wireframe = wireframes[id];

  if (!Wireframe) return null;

  return (
    <div
      className={cn(
        "pointer-events-none w-full h-full max-h-[36vh] md:max-h-[44vh] max-w-[min(100%,300px)] md:max-w-[min(100%,360px)] aspect-square",
        className,
      )}
    >
      <Wireframe />
    </div>
  );
}
