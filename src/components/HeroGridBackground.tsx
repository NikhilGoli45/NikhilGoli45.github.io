import { useEffect, useRef } from "react";

type GridPoint = { x: number; y: number };

type Pulse = {
  path: GridPoint[];
  startT: number;
  endT: number;
  progress: number;
  duration: number;
};

const MAX_CONCURRENT = 3;
const PULSE_DURATION_MS = 7000;
const SPAWN_INTERVAL_MIN = 2000;
const SPAWN_INTERVAL_MAX = 8000;
const PULSE_DURATION_MIN = 0.65;
const PULSE_DURATION_MAX = 1.4;
const EXIT_EXTRA_STEPS = 10;
const MAX_FRAME_DT = 50;
const DOT_RADIUS = 1.35;

function readThemeColors() {
  const style = getComputedStyle(document.documentElement);
  const muted = style.getPropertyValue("--muted-foreground").trim();
  const foreground = style.getPropertyValue("--foreground").trim();
  return {
    dot: muted ? `hsl(${muted})` : "hsl(0 0% 53%)",
    pulse: foreground ? `hsl(${foreground})` : "hsl(40 14% 96%)",
    dotAlpha: 0.22,
    pulseStrokeAlpha: 0.45,
    pulseHeadAlpha: 0.6,
  };
}

function pointOnPath(path: GridPoint[], t: number): GridPoint {
  const segments = path.length - 1;
  const clamped = Math.max(0, Math.min(t, segments));
  const idx = Math.min(Math.floor(clamped), segments - 1);
  const frac = clamped - idx;
  const from = path[idx];
  const to = path[idx + 1];
  return {
    x: from.x + (to.x - from.x) * frac,
    y: from.y + (to.y - from.y) * frac,
  };
}

function pathLength(path: GridPoint[]): number {
  let len = 0;
  for (let i = 1; i < path.length; i++) {
    len += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
  }
  return len;
}

function isInsideViewport(p: GridPoint, width: number, height: number, inset = 0) {
  return p.x >= inset && p.x <= width - inset && p.y >= inset && p.y <= height - inset;
}

function clipPathToViewport(path: GridPoint[], width: number, height: number): GridPoint[] {
  const first = path.findIndex((p) => isInsideViewport(p, width, height, -2));
  if (first === -1) return [];

  let last = first;
  for (let i = path.length - 1; i >= first; i--) {
    if (isInsideViewport(path[i], width, height, -2)) {
      last = i;
      break;
    }
  }

  if (last - first < 1) return [];
  return path.slice(first, last + 1);
}

function passesNearCenter(path: GridPoint[], width: number, height: number) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.3;
  return path.some((p) => Math.hypot(p.x - cx, p.y - cy) < radius);
}

type Edge = "left" | "right" | "top" | "bottom";

function pointOnEdge(x: number, y: number, width: number, height: number, margin: number): Edge | null {
  if (x <= margin) return "left";
  if (x >= width - margin) return "right";
  if (y <= margin) return "top";
  if (y >= height - margin) return "bottom";
  return null;
}

function getEdgeFade(p: GridPoint, width: number, height: number, fadeDist: number) {
  let fade = 1;
  if (p.x < 0) fade = Math.min(fade, 1 + p.x / fadeDist);
  if (p.x > width) fade = Math.min(fade, 1 - (p.x - width) / fadeDist);
  if (p.y < 0) fade = Math.min(fade, 1 + p.y / fadeDist);
  if (p.y > height) fade = Math.min(fade, 1 - (p.y - height) / fadeDist);
  return Math.max(0, fade);
}

function isNearScreen(p: GridPoint, width: number, height: number, pad: number) {
  return p.x >= -pad && p.x <= width + pad && p.y >= -pad && p.y <= height + pad;
}

function getPulseHeadT(pulse: Pulse) {
  return pulse.startT + pulse.progress * (pulse.endT - pulse.startT);
}

function preparePulsePath(
  path: GridPoint[],
  width: number,
  height: number,
  spacing: number,
): { startT: number; endT: number } | null {
  if (path.length < 2) return null;

  const clipped = clipPathToViewport(path, width, height);
  const minLen = Math.hypot(width, height) * 0.35;
  if (clipped.length < 3 || pathLength(clipped) < minLen || !passesNearCenter(clipped, width, height)) {
    return null;
  }

  const enterIdx = path.findIndex((p) => isInsideViewport(p, width, height, -spacing * 0.5));
  if (enterIdx === -1) return null;

  const exitIdx = (() => {
    for (let i = path.length - 1; i >= 0; i--) {
      if (isInsideViewport(path[i], width, height, -spacing * 0.5)) return i;
    }
    return -1;
  })();
  if (exitIdx <= enterIdx) return null;

  const startT = Math.max(0, enterIdx - 1);
  const endT = path.length - 1;
  const edgePad = spacing * 2;

  const entry = pointOnPath(path, startT);
  if (!isNearScreen(entry, width, height, edgePad)) return null;

  const midT = startT + (exitIdx - startT) * 0.5;
  const mid = pointOnPath(path, midT);
  if (!isInsideViewport(mid, width, height, spacing)) return null;

  let insideCount = 0;
  for (let i = Math.floor(startT); i <= exitIdx; i++) {
    if (isInsideViewport(path[i], width, height, spacing * 0.5)) insideCount++;
  }
  const visibleRatio = insideCount / (exitIdx - Math.floor(startT) + 1);
  if (visibleRatio < 0.55) return null;

  return { startT, endT };
}

function getPulseOpacity(pulse: Pulse, width: number, height: number, spacing: number) {
  if (pulse.path.length < 2) return 0;
  const head = pointOnPath(pulse.path, getPulseHeadT(pulse));
  const fadeDist = spacing * 4;
  const edgeFade = getEdgeFade(head, width, height, fadeDist);
  const enterFade = pulse.progress < 0.05 ? pulse.progress / 0.05 : 1;
  return edgeFade * enterFade;
}

function isPulseOnScreen(pulse: Pulse, width: number, height: number, spacing: number) {
  if (pulse.path.length < 2 || pulse.progress >= 1.02) return false;
  const head = pointOnPath(pulse.path, getPulseHeadT(pulse));
  return isNearScreen(head, width, height, spacing * 3) && getPulseOpacity(pulse, width, height, spacing) > 0.04;
}

function isPulseDrawable(pulse: Pulse, width: number, height: number, spacing: number) {
  if (pulse.path.length < 2 || pulse.progress >= 1.05) return false;
  return getPulseOpacity(pulse, width, height, spacing) > 0.02;
}

function getSpacing(width: number) {
  return width < 640 ? 40 : 36;
}

function buildGrid(width: number, height: number, spacing: number): GridPoint[][] {
  const half = spacing / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const extent = Math.ceil(Math.hypot(width, height) / half) + 8;
  const mid = Math.floor(extent / 2);
  const grid: GridPoint[][] = [];

  for (let i = 0; i < extent; i++) {
    grid[i] = [];
    for (let j = 0; j < extent; j++) {
      const di = i - mid;
      const dj = j - mid;
      grid[i][j] = {
        x: centerX + (dj - di) * half,
        y: centerY + (di + dj) * half,
      };
    }
  }

  return grid;
}

type Dir = [number, number];

const INWARD_DIRECTIONS: Record<Edge, Dir[]> = {
  left: [[-1, 0], [0, 1]],
  right: [[1, 0], [0, -1]],
  top: [[1, 0], [0, 1]],
  bottom: [[-1, 0], [0, -1]],
};

function getEdgeCandidates(
  grid: GridPoint[][],
  width: number,
  height: number,
  margin: number,
) {
  const candidates: { i: number; j: number; edge: Edge }[] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const { x, y } = grid[i][j];
      if (x <= margin) candidates.push({ i, j, edge: "left" });
      else if (x >= width - margin) candidates.push({ i, j, edge: "right" });
      else if (y <= margin) candidates.push({ i, j, edge: "top" });
      else if (y >= height - margin) candidates.push({ i, j, edge: "bottom" });
    }
  }

  return candidates;
}

function buildCrossScreenPath(
  grid: GridPoint[][],
  width: number,
  height: number,
  spacing: number,
): GridPoint[] {
  const margin = spacing * 0.75;
  const candidates = getEdgeCandidates(grid, width, height, margin);
  if (candidates.length === 0) return [];

  const start = candidates[Math.floor(Math.random() * candidates.length)];
  const directions = INWARD_DIRECTIONS[start.edge];
  const [di, dj] = directions[Math.floor(Math.random() * directions.length)];

  const path: GridPoint[] = [grid[start.i][start.j]];
  let i = start.i;
  let j = start.j;

  while (path.length < 800) {
    const ni = i + di;
    const nj = j + dj;
    if (ni < 0 || nj < 0 || ni >= grid.length || nj >= grid[0].length) break;

    i = ni;
    j = nj;
    const point = grid[i][j];
    path.push(point);

    const reachedEdge = pointOnEdge(point.x, point.y, width, height, margin);
    if (reachedEdge && reachedEdge !== start.edge && path.length >= 6) {
      for (let extra = 0; extra < EXIT_EXTRA_STEPS; extra++) {
        const ei = i + di;
        const ej = j + dj;
        if (ei < 0 || ej < 0 || ei >= grid.length || ej >= grid[0].length) break;
        i = ei;
        j = ej;
        path.push(grid[i][j]);
      }
      break;
    }
  }

  const clipped = clipPathToViewport(path, width, height);
  const minLen = Math.hypot(width, height) * 0.35;

  if (clipped.length < 3 || pathLength(clipped) < minLen || !passesNearCenter(clipped, width, height)) {
    return [];
  }

  return path;
}

function scheduleNextSpawn(state: { nextSpawnIn: number; spawnTimer: number }) {
  state.spawnTimer = 0;
  state.nextSpawnIn =
    SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN);
}

function spawnPulse(state: {
  grid: GridPoint[][];
  pulses: Pulse[];
  spacing: number;
  width: number;
  height: number;
}): boolean {
  if (state.grid.length === 0 || state.width === 0 || state.height === 0) return false;

  const active = state.pulses.filter((p) =>
    isPulseOnScreen(p, state.width, state.height, state.spacing),
  ).length;
  if (active >= MAX_CONCURRENT) return false;

  for (let attempt = 0; attempt < 12; attempt++) {
    const path = buildCrossScreenPath(state.grid, state.width, state.height, state.spacing);
    const bounds = preparePulsePath(path, state.width, state.height, state.spacing);
    if (!bounds) continue;

    state.pulses.push({
      path,
      startT: bounds.startT,
      endT: bounds.endT,
      progress: 0,
      duration:
        PULSE_DURATION_MS *
        (PULSE_DURATION_MIN + Math.random() * (PULSE_DURATION_MAX - PULSE_DURATION_MIN)),
    });
    return true;
  }

  return false;
}

const HeroGridBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    grid: [] as GridPoint[][],
    pulses: [] as Pulse[],
    width: 0,
    height: 0,
    spacing: 36,
    spawnTimer: 0,
    nextSpawnIn: SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN),
    colors: readThemeColors(),
    animating: false,
    rafId: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width;
      state.height = rect.height;
      state.spacing = getSpacing(rect.width);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.grid = buildGrid(rect.width, rect.height, state.spacing);
      state.colors = readThemeColors();
    };

    const drawDots = () => {
      const { grid, width, height, colors } = state;
      for (const row of grid) {
        for (const point of row) {
          if (point.x < -10 || point.x > width + 10 || point.y < -10 || point.y > height + 10) {
            continue;
          }
          ctx.beginPath();
          ctx.arc(point.x, point.y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = colors.dot;
          ctx.globalAlpha = colors.dotAlpha;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const drawPulse = (pulse: Pulse) => {
      const { path, progress } = pulse;
      const { colors, width, height, spacing } = state;
      if (path.length < 2) return;

      const opacity = getPulseOpacity(pulse, width, height, spacing);
      if (opacity <= 0.02) return;

      const headT = getPulseHeadT(pulse);
      const trailSpan = Math.max(12, (pulse.endT - pulse.startT) * 0.18);
      const tailT = Math.max(pulse.startT, headT - trailSpan);
      const head = pointOnPath(path, headT);
      const tail = pointOnPath(path, tailT);

      const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, colors.pulse);

      ctx.beginPath();
      const steps = 24;
      for (let s = 0; s <= steps; s++) {
        const t = tailT + ((headT - tailT) * s) / steps;
        const p = pointOnPath(path, t);
        if (s === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = opacity * colors.pulseStrokeAlpha;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = colors.pulse;
      ctx.globalAlpha = opacity * colors.pulseHeadAlpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, state.width, state.height);
      drawDots();
      for (const pulse of state.pulses) {
        drawPulse(pulse);
      }
    };

    const maybeSpawnPulse = (dt: number) => {
      const active = state.pulses.filter((p) =>
        isPulseOnScreen(p, state.width, state.height, state.spacing),
      ).length;
      if (active >= MAX_CONCURRENT) return;

      state.spawnTimer += dt;
      if (state.spawnTimer < state.nextSpawnIn) return;

      if (spawnPulse(state)) {
        scheduleNextSpawn(state);
      } else {
        state.spawnTimer = 0;
        state.nextSpawnIn = 600 + Math.random() * 800;
      }
    };

    const updatePulses = (dt: number) => {
      const { width, height, spacing } = state;
      state.pulses = state.pulses.filter((pulse) => {
        pulse.progress += dt / pulse.duration;
        return pulse.progress < 1.05 && getPulseOpacity(pulse, width, height, spacing) > 0.02;
      });
    };

    let lastTime = performance.now();

    const tick = (time: number) => {
      if (!state.animating) return;
      const dt = Math.min(time - lastTime, MAX_FRAME_DT);
      lastTime = time;

      updatePulses(dt);
      maybeSpawnPulse(dt);
      draw();

      state.rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reducedMotion) return;
      if (state.animating) return;
      state.animating = true;
      lastTime = performance.now();
      state.spawnTimer = 0;
      state.rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      state.animating = false;
      cancelAnimationFrame(state.rafId);
    };

    resize();
    draw();

    if (!reducedMotion) {
      scheduleNextSpawn(state);
      if (Math.random() < 0.4) {
        spawnPulse(state);
        scheduleNextSpawn(state);
      }
      draw();
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(container);

    const heroSection = container.closest("#hero");
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (reducedMotion) return;
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(heroSection ?? container);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default HeroGridBackground;
