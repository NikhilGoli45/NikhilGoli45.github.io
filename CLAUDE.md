# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run lint       # ESLint
npm run preview    # Preview production build locally

# Deploy to GitHub Pages (nikhilgoli.com)
npm run predeploy  # Builds, copies index.html → 404.html, writes CNAME
npm run deploy     # Pushes dist/ to gh-pages branch
```

## Architecture

Single-page portfolio site built with React + TypeScript + Vite, deployed to GitHub Pages via the `gh-pages` branch.

**Routing** (`src/App.tsx`): React Router v6 with three routes — `/` (main portfolio), `/projects/:id` (project detail), `/projects/not-ready` (placeholder). The `*` catch-all renders `NotFound`.

**Main page** (`src/pages/Index.tsx`): Renders all portfolio sections in order: Navbar → Hero → About → Education → Experience → Projects → Skills → Contact → Footer. Each section (except Hero) is wrapped in `animate-on-scroll` divs driven by `useScrollAnimation` (`src/utils/useScrollAnimation.ts`), which adds `visible` via an IntersectionObserver-style scroll listener. Hash-based deep linking (e.g. `/#experience`) is handled in `Index.tsx`.

**Project detail pages** (`src/pages/ProjectDetail.tsx`): Looks up the `:id` param in `customPages` (a `Record<string, React.FC>` mapping) and renders the corresponding component from `src/pages/projects/`. To add a new project page: create the component in `src/pages/projects/`, import it in `ProjectDetail.tsx`, add it to `customPages`, and add an entry to `src/data/projects.ts`.

**Data** (`src/data/projects.ts`): Single source of truth for the `projects` array (used by `ProjectsSection` to render cards). Each entry has an `id` that must match the key in `customPages`.

**UI components** (`src/components/ui/`): shadcn/ui components — treat as library code, don't modify unless updating the design system. Portfolio-specific sections live in `src/components/` (non-`ui/` files).

**Theming**: `useTheme` hook (`src/hooks/useTheme.tsx`) wraps `next-themes`. Dark mode uses Tailwind `dark:` variants throughout. CSS custom properties defined in `src/index.css`.

**Styling**: Tailwind CSS v3 with `tailwind-merge` + `clsx` (via `cn()` in `src/lib/utils.ts`). Config in `tailwind.config.ts`.

**Path alias**: `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

**Contact form**: Uses `emailjs-com` in `ContactSection.tsx` for client-side email sending (no backend).
