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
  lib/            # Utilities (cn(), query-keys, shared helpers)
    formatters/   # Date, currency, string formatting helpers
    ui-mappers/   # Status/enum to UI representation mappers
  rpc/            # Unified API/RPC layer (network calls + internal mocks)
  types/          # DTOs (Zod schemas), domain models, mappers
```

## Architecture Rules (CRITICAL)

See `FRONTEND_ARCH_PATTERNS.md` for the full rationale. The key rules:

### 1. Anti-Corruption Layer (Zod DTOs)

Every API response MUST be validated through a Zod schema before use. **The RPC layer establishes the anti-corruption boundary**: RPC functions validate and map before returning domain models to consumers.

#### Implementation Pattern

```typescript
// src/rpc/reports.ts
import { delayedValue } from "@/lib/utils";
import { ReportDTOSchema, mapReportDtoToDomain } from "@/types";
import type { TSppgReport } from "@/types";

/**
 * Fetches SPPG reports with full details.
 * Returns canonical domain model - consumers never see DTO.
 */
export async function fetchSppgReports(): Promise<TSppgReport[]> {
  // TODO: Replace with real fetch when backend ready
  // const response = await fetch('/api/sppg/reports');
  // const json = await response.json();
  
  // Mock data using delayedValue for realistic async behavior
  const mockData = await delayedValue([
    {
      id: "1",
      title: "Nasi Goreng",
      image_url: "/images/nasi-goreng.jpg",
      created_at: "2024-03-15T10:30:00Z",
      // ... other DTO fields (snake_case, raw backend format)
    }
  ], 800);
  
  // Anti-corruption layer: validate + map
  const dto = ReportDTOSchema.parse(mockData);
  return dto.map(mapReportDtoToDomain);
}
```

**Key Rules:**
1. **RPC functions MUST return domain models** - never expose DTOs to consumers
2. **Zod validation is mandatory** - use `.parse()` to fail fast on schema mismatches
3. **Mapping happens inside RPC** - consumers only work with clean domain models
4. **Use `delayedValue()` for mocks** - simulates network latency during development

When backend is ready, swap the mock with real fetch - consumers remain unchanged:

```typescript
// After backend is ready - just replace the mock section
const response = await fetch('/api/sppg/reports');
const json = await response.json();

// Validation + mapping stays the same
const dto = ReportDTOSchema.parse(json);
return dto.map(mapReportDtoToDomain);
```

### 2. Smart / Dumb Component Split

- **`src/components/`** — Presentational only. Receive all data via props. NEVER import `useQuery`, stores, or any data-fetching hook here.
- **`src/containers/`** — Data orchestration. Fetch data via custom hooks, handle loading/error/empty states, pass data down to components.

### 3. Unified RPC Layer

All network calls live in `src/rpc/`. When the backend is unavailable, mock responses inline with `Promise.resolve()` / `setTimeout()`. Swap to real fetch calls in-place when ready. Consumers (hooks/containers) remain unchanged.

### 4. Data Flow

```
Backend API -> RPC Layer (Zod validation + Mapping) -> Domain Model -> TanStack Query hook -> Container -> Component
```

The anti-corruption boundary is established at the RPC layer's return value. Everything after RPC works with clean domain models.

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

#### Component Props Pattern (Pragmatic Default)

**Default: Accept domain objects as props** for domain-specific components:

```typescript
// src/components/reports/sppg-report-card.tsx
import { formatShortDate } from "@/lib/formatters/date";
import type { TSppgReport } from "@/types";

export interface SppgReportCardProps {
  report: TSppgReport; // Accept full domain object
}

export function SppgReportCard({ report }: SppgReportCardProps) {
  // Use shared helpers for transformations
  const postedAt = formatShortDate(report.postedAt);
  const author = report.author.sppgName;

  return (
    <Card>
      <h3>{report.title}</h3>
      <p>{author} • {postedAt}</p>
      <NutritionalFacts facts={report.nutritionalFacts} />
    </Card>
  );
}
```

**Rules:**
1. **Components accept domain objects** - this keeps call sites simple: `<SppgReportCard report={report} />`
2. **Use shared helpers for transformations** - never duplicate formatting logic (date, currency, status)
3. **Extract helpers when you see duplication** - if the same transformation appears in 2+ places, create a helper in `src/lib/formatters/` or `src/lib/ui-mappers/`
4. **Components can access nested properties** - `report.author.sppgName` is fine
5. **Keep components focused** - if a component needs extensive data reshaping, consider if it should be split

**Helper Organization:**
- `src/lib/formatters/` - Pure data transformations (dates, currency, strings)
- `src/lib/ui-mappers/` - Domain-to-UI mappings (status → badge variant, enum → label)

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

1. **Define DTO schema** in `src/types/dto.ts` and infer the TS type with `z.infer<>`
2. **Create mapper function** in `src/types/mappers.ts` (DTO → domain model, pure function)
3. **Create RPC function** in `src/rpc/` that:
   - Uses `delayedValue()` for mock data during development
   - Validates with Zod `.parse()`
   - Maps DTO to domain model
   - Returns domain model (never exposes DTO)
4. **Create TanStack Query hook** in `src/hooks/` that calls the RPC function
5. **Add query key** to `src/lib/query-keys.ts`
6. **Build container** in `src/containers/`:
   - Calls hook (client-side) or RPC directly (server-side)
   - Handles loading/error/empty states
   - Passes domain objects to components
7. **Build component** in `src/components/`:
   - Accepts domain objects as props
   - Uses shared helpers from `src/lib/formatters/` or `src/lib/ui-mappers/`
   - Extracts new helpers if you see duplication
8. **Run verification**: `pnpm format && pnpm build`

### Example: Adding a Reports Feature

```typescript
// 1. src/types/dto.ts
export const ReportDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
  image_url: z.string(),
});
export type ReportDTO = z.infer<typeof ReportDTOSchema>;

// 2. src/types/mappers.ts
export const mapReportDtoToDomain = (dto: ReportDTO): TSppgReport => ({
  id: dto.id,
  title: dto.title,
  createdAt: new Date(dto.created_at), // Transform to Date
  imageUrl: dto.image_url, // camelCase
});

// 3. src/rpc/reports.ts
export async function fetchSppgReports(): Promise<TSppgReport[]> {
  const mockData = await delayedValue([/* mock */], 800);
  const dto = ReportDTOSchema.array().parse(mockData);
  return dto.map(mapReportDtoToDomain);
}

// 4. src/hooks/use-sppg-reports.ts
export function useSppgReports() {
  return useQuery({
    queryKey: queryKeys.reports.list(),
    queryFn: fetchSppgReports,
  });
}

// 5. src/containers/sppg-report-container.tsx
export function SppgReportContainer() {
  const { data: reports, isLoading } = useSppgReports();
  if (isLoading) return <Skeleton />;
  return reports?.map(report => <SppgReportCard report={report} />);
}

// 6. src/components/reports/sppg-report-card.tsx
export function SppgReportCard({ report }: { report: TSppgReport }) {
  const postedAt = formatShortDate(report.postedAt); // Shared helper
  return <Card>{/* render */}</Card>;
}
```

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **pagar-fe** (588 symbols, 1259 relationships, 11 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/pagar-fe/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/pagar-fe/context` | Codebase overview, check index freshness |
| `gitnexus://repo/pagar-fe/clusters` | All functional areas |
| `gitnexus://repo/pagar-fe/processes` | All execution flows |
| `gitnexus://repo/pagar-fe/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
