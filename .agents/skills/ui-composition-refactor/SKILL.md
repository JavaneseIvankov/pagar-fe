---
name: ui-composition-refactor
description: Restructures Next.js / React UI pages into a highly composable architecture using a smart/dumb pattern and reusable wrapper components. Make sure to use this skill whenever the user asks to "refactor this page", "make this DRY", "abstract UI components", or "split into smart and dumb components" in a React/Next.js codebase.
---

# UI Composition Refactoring Pattern

This skill guides you through refactoring large, monolithic React UI pages into a highly composable, maintainable, and DRY architecture based on the "Smart/Dumb" component split. It is especially useful for dense dashboards, forms, and data-heavy views.

## The Mental Model

When refactoring a large React file:

1. **Dumb Components (Presentational):** Visual only. They receive data strictly via `props`. No fetching, no complex state extraction.
2. **Generic Wrappers:** Components that wrap default primitive UI elements to standardize spacing, borders, or styling across the page.
3. **Smart Containers (Orchestrators):** The brain. They hold or fetch the data, handle loading/error states, and compose the dumb components by passing data down.
4. **Thin Pages (Next.js):** The `page.tsx` itself should have almost no logic or layout. It simply drops in the Smart Container.

## Refactoring Workflow

Follow this precise sequence when the user asks you to refactor or DRY up a page:

### Step 1: Identify and Extract Generic Wrappers

Look for layout elements used repeatedly with the exact same utility classes (e.g., standard layout cards or standardized buttons).

- Create a specific wrapper component, inheriting properties from the base component.
- **Example:** If `<Card className="rounded-xl border-0 ring-0">` appears 5 times, extract it to a `FeatureCard` wrapper component.

### Step 2: Extract Dumb Presentational Components

Look for isolated semantic sections of the page (e.g., "Summary Metrics", "Data Table", "Action List").

- Move these into separate files (e.g., `src/components/feature/summary-list.tsx`).
- Define strict TypeScript interfaces for their `props`.
- Do not let these components define their own mock data arrays; force them to accept the data array via `props`.

### Step 3: Create the Smart Container

Create a container component to orchestrate the pieces extracted in Steps 1 & 2.

- Move any hardcoded mock data or fetching hooks (`useQuery`, etc.) into this container.
- Manage loading and empty states here.
- Render the presentational components from Step 2, passing the data as props.
- File placement example: `src/containers/feature-container.tsx`.

### Step 4: Simplify the Page Component

Wipe out the old code in the original `page.tsx`.

- The Next.js page should simply render the Container from Step 3.
- Example: `return <FeatureContainer />;`

## Things to Avoid

- **DO NOT** leave state or data fetching in the dumb `src/components/` files.
- **DO NOT** make assumptions about API schemas immediately unless requested. When purely composing UI rely on presentational types defined in the `src/types/index.ts` folder, or other locations pointed out by the user. If it's not there rely on local Mock Data constants in the container, defining local TypeScript interfaces until the RPC/DTO layer is ready.
- **DO NOT** ignore styling. If extracting a section creates styling breaks, make sure wrapper CSS correctly replaces standard page padding.
