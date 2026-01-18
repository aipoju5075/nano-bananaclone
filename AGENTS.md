# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router entrypoints (`app/layout.tsx`, `app/page.tsx`) and global styles (`app/globals.css`).
- `components/`: Feature/section components (kebab-case filenames, e.g. `components/hero-section.tsx`).
- `components/ui/`: Reusable UI primitives (shadcn-style). Prefer reusing these before adding new variants.
- `hooks/`: Shared React hooks (e.g. `hooks/use-toast.ts`).
- `lib/`: Small utilities and helpers (e.g. `lib/utils.ts`). Import via `@/lib/...`.
- `public/`: Static assets served as-is (images, icons).
- `styles/`: Additional global CSS (verify whether changes should live in `app/globals.css` vs `styles/globals.css`).

TypeScript path alias `@/*` maps to the repo root (see `tsconfig.json`).

## Build, Test, and Development Commands

This repo uses `pnpm` (see `pnpm-lock.yaml`):

- `pnpm install`: Install dependencies.
- `pnpm dev`: Run the local dev server.
- `pnpm build`: Create a production build.
- `pnpm start`: Run the production server (after `pnpm build`).
- `pnpm lint`: Run ESLint across the project.
- Optional type-check: `pnpm exec tsc --noEmit` (recommended before PRs).

## Coding Style & Naming Conventions

- Language: TypeScript + React (`.ts`, `.tsx`).
- Formatting: follow existing code (2-space indent, no semicolons, PascalCase React components, kebab-case filenames).
- Imports: prefer absolute imports using `@/` (e.g. `import { Footer } from "@/components/footer"`).
- UI: keep `components/ui/*` consistent and composable; avoid duplicating primitives.

## Testing Guidelines

- No automated test runner is currently configured in this workspace (no `jest`/`vitest`/`playwright` configs found).
- Validate changes manually via `pnpm dev`, and add a minimal test setup if you introduce logic that’s hard to verify by hand.

## Commit & Pull Request Guidelines

- Git history is not available in this workspace, so commit conventions can’t be inferred. Recommended: Conventional Commits (e.g. `feat: add crop tool`, `fix: correct canvas scaling`).
- PRs: include a short description, screenshots/GIFs for UI changes, and reproduction steps for bug fixes. Note any user-facing behavior changes and include accessibility considerations (keyboard/focus states).

## Security & Configuration Tips

- Avoid committing secrets; prefer `.env.local` for local-only configuration (do not check in `.env*` files).
- `next.config.mjs` currently ignores TypeScript build errors—use `pnpm exec tsc --noEmit` to catch issues early.
