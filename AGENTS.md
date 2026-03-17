# AGENTS.md — Pagar Frontend

## Project Overview

Pagar is a Next.js 16 frontend (React 19, TypeScript, Tailwind CSS v4) for a food/nutrition reporting platform. The UI language is Indonesian. Package manager is **pnpm**.

## Build / Dev / Lint Commands

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `pnpm dev`    | Start Next.js dev server                |
| `pnpm build`  | Production build (type-checks included) |
| `pnpm format` | Auto-format with Biome (`--write`)      |
| `pnpm lint`   | Lint with Biome (no auto-fix)           |

There is **no test runner configured** (no Vitest/Jest). If you add tests, use Vitest.

### Pre-commit Hook (Husky)

The `.husky/pre-commit` hook runs `pnpm format && pnpm lint` on every commit. Always run `pnpm format` before committing to avoid hook failures.

## Tech Stack

- **Framework:** Next.js 16 (App Router, RSC by default)
- **React:** 19.2 — use React 19 APIs (use, useActionState, etc.)
- **Styling:** Tailwind CSS v4 (PostCSS plugin, `@import "tailwindcss"` in globals.css)
- **UI Library:** shadcn/ui (radix-nova style) — components live in `src/components/ui/`
- **Icons:** HugeIcons (`@hugeicons/core-free-icons` + `@hugeicons/react`)
- **Forms:** react-hook-form + @hookform/resolvers + Zod v4
- **Data Fetching:** TanStack Query v5
- **State Management:** Zustand v5
- **Validation:** Zod v4 (runtime DTO validation)
- **Linter/Formatter:** Biome 2.4 (replaces Prettier + ESLint for formatting/linting)
- **Font:** Poppins (via CSS `--font-sans`)

## Directory Structure

```
src/
  app/            # Next.js App Router pages and layouts
  components/     # Dumb/presentational components (props-only, no data fetching)
    ui/           # shadcn/ui primitives — DO NOT manually edit these files
  containers/     # Smart components (data fetching, orchestration, minimal styling)
  hooks/          # Custom hooks (TanStack Query wrappers, Zustand stores)
  lib/            # Utilities (cn(), query-keys)
  rpc/            # Unified API/RPC layer (network calls + internal mocks)
  types/          # DTOs (Zod schemas), domain models, mappers
```

## Architecture Rules (CRITICAL)

See `FRONTEND_ARCH_PATTERNS.md` for the full rationale. The key rules:

### 1. Anti-Corruption Layer (Zod DTOs)

Every API response MUST be validated through a Zod schema before use. Define DTO schemas in `src/types/`, infer TS types from them with `z.infer<>`, then map to UI domain models with pure mapper functions.

### 2. Smart / Dumb Component Split

- **`src/components/`** — Presentational only. Receive all data via props. NEVER import `useQuery`, stores, or any data-fetching hook here.
- **`src/containers/`** — Data orchestration. Fetch data via custom hooks, handle loading/error/empty states, pass data down to components.

### 3. Unified RPC Layer

All network calls live in `src/rpc/`. When the backend is unavailable, mock responses inline with `Promise.resolve()` / `setTimeout()`. Swap to real fetch calls in-place when ready. Consumers (hooks/containers) remain unchanged.

### 4. Data Flow

```
Backend API -> RPC Layer -> Zod validation -> Mapper -> TanStack Query hook -> Container -> Component
```

## Code Style Guidelines

### Formatting (Biome)

- **Indent:** 2 spaces
- **Quotes:** Double quotes for strings
- **Semicolons:** Yes (Biome default)
- **Trailing commas:** Yes
- **Line width:** Biome default (80)
- **Import sorting:** Biome `organizeImports` is enabled — imports are auto-sorted on format

### TypeScript

- **Strict mode** is enabled (`"strict": true` in tsconfig)
- Use `type` keyword for type-only imports: `import type { Foo } from "..."`
- Prefer `interface` for component props, `type` for unions/intersections
- Path alias: `@/*` maps to `src/*` — always use `@/` imports, never relative `../`
- Exception: relative imports are acceptable for sibling files in the same directory (e.g., `"./nutritional-facts"`)

### Naming Conventions

- **Files:** kebab-case (`civil-report-card.tsx`, `use-dialog.tsx`)
- **Components:** PascalCase named exports (`export function CivilReportCard`)
- **Hooks:** camelCase with `use` prefix (`useDialogStore`)
- **Types/Interfaces:** PascalCase (`CivilReportCardProps`, `NutritionalFact`)
- **Zod schemas:** PascalCase with `Schema` suffix (`ReportDTOSchema`)
- **DTO types:** PascalCase with `DTO` suffix (`ReportDTO`)
- **Mappers:** camelCase `mapXDtoToUi` pattern (`mapReportDtoToReport`)
- **Query keys:** Centralized in `src/lib/query-keys.ts`
- **Containers:** PascalCase with `Container` suffix (`CivilReportContainer`)

### Components

- Use `function` declarations (not arrow functions) for component exports
- Props are destructured in the function signature
- Define props interfaces next to the component, exported when used externally
- Use `cn()` from `@/lib/utils` for conditional class merging
- Tailwind classes must be sorted (Biome `useSortedClasses` rule is enabled)
- Use `"use client"` directive only when the component requires client-side interactivity (state, effects, event handlers)
- Default to server components (no directive needed)

### shadcn/ui Components

- **PRIORITIZE SHADCN/UI:** Whenever building UI, you MUST prioritize using and composing `shadcn/ui` components over building custom elements from scratch. I have provided a `shadcn/ui` skill for this project—use it to search, add, and correctly implement components.
- Located in `src/components/ui/` — these are auto-generated by `shadcn`
- **DO NOT manually edit** files in `src/components/ui/`
- To add new shadcn components: `pnpm dlx shadcn@latest add <component-name>`
- Biome config excludes `**/components/ui` from linting

### Icons
and
Use HugeIcons, not Lucide:

```tsx
import { ThumbsUp } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

<HugeiconsIcon icon={ThumbsUp} size={16} />;
```

### Error Handling

- RPC layer: Zod `.parse()` will throw on schema mismatch — this is intentional (fail-fast)
- Containers: Handle loading/error states from TanStack Query before rendering
- Use `sonner` (`<Toaster />`) for toast notifications (already set up in Providers)

### State Management

- **Server state:** TanStack Query (queries + mutations)
- **Client state:** Zustand stores in `src/hooks/` (see `use-dialog.tsx` pattern)
- Avoid prop drilling — use Zustand for cross-cutting client concerns

## Biome Lint Notes

- Biome rule `noArrayIndexKey` is sometimes suppressed with inline comments when index is stable: `// biome-ignore lint/suspicious/noArrayIndexKey: stable index`
- `noUnknownAtRules` is off (for Tailwind directives)
- React and Next.js recommended rules are enabled

## Adding a New Feature (Checklist)

1. Define Zod DTO schema in `src/types/` and infer the TS type
2. Create a pure mapper function (DTO -> domain model)
3. Add the RPC function in `src/rpc/` (mock if backend unavailable)
4. Create a TanStack Query hook in `src/hooks/`
5. Add query key to `src/lib/query-keys.ts`
6. Build the container in `src/containers/` call needed hooks (if client side) or fetch (if server-side) and orchestate required ui-states
7. Build the presentational component in `src/components/` (props only)
8. Run `pnpm format && pnpm build` to verify
