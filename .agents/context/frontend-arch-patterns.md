# Pagar – Frontend Architecture & Patterns

> Note: This document outlines the architectural decisions and patterns used in the Pagar frontend codebase. It focuses on data flow, runtime safety, and UI component separation to ensure a stable and maintainable project as we scale.

## 🎯 Vision & Philosophy

Our primary goal is to build a resilient frontend that protects the UI from unexpected backend changes. We prioritize runtime safety, developer experience, and clear boundaries between data fetching and rendering.

To achieve this, we are enforcing strict architectural rules:

1. **Validation at the boundary:** Every API response is validated at runtime.
2. **Unified data fetching:** A single RPC module without fractured environments.
3. **Decoupled UI:** Clear separation between data managers (Smart components) and visual renderers (Dumb components).

---

## 🏗️ Core Architectural Patterns

### 1. Unified RPC Layer with Internal Mocking

We avoid over-engineering the mock vs. real implementation by keeping a single, unified `rpc` module. Instead of maintaining parallel architectural layers (e.g., `_mock` and `_real` directories), we expose a single set of fetching functions.

- When backend endpoints are unavailable, we mock the responses manually within the RPC functions using Promise utilities (`Promise.resolve`, `setTimeout`, etc.).
- Once the real backend is ready, we simply swap the internal mock returning a Promise with the actual `fetch` or `axios` call inside the same function.
- The components and hooks consuming these RPC functions remain entirely unaffected.

### 2. Anti-Corruption Layer: Zod for DTO Validation

Backend contracts can drift, leading to silent UI bugs or crashes. To prevent this, we use the **Anti-Corruption Layer** pattern via **Zod**:

- We define Data Transfer Object (DTO) schemas in Zod.
- Every response from the RPC layer is parsed through its respective Zod schema.
- **Fail Fast:** If the backend response signature changes (e.g., a field is renamed, or `null` is returned instead of a string), the Zod validation will throw an error immediately at the network boundary, catching schema drift early.
- We infer TypeScript types directly from these Zod schemas to ensure absolute sync between runtime validation and compile-time types.

### 3. Pure TypeScript Mappers to Domain Models

Backend API schemas shouldn't dictate how our UI components manage data. We decouple the backend structure from the frontend structure using a mapping pattern:

```typescript
import { z } from 'zod';

// 1. Zod Schema: The contract with the backend
export const ReportDTOSchema = z.object({
   id: z.string(),
   created_at: z.string(), // Backend uses snake_case and strings for dates
});
export type ReportDTO = z.infer<typeof ReportDTOSchema>;

// 2. Domain Model: What the UI actually cares about
export interface Report {
   id: string;
   createdAt: Date; // UI prefers camelCase and Date objects
}

// 3. Pure Mapper: Validated DTO flows in (parsed at lower layer), Domain Model flows out
export const mapReportDtoToUi = (dto: ReportDTO): Report => {
   return {
      id: dto.id,
      createdAt: new Date(dto.created_at),
   };
};
```

### 4. Smart / Dumb Component Pattern

To maximize reusability and simplify testing, we strictly adhere to the Smart (Container) / Dumb (Presentational) component pattern.

#### Containers (Smart Components)

Located in `src/containers/`.

- **Responsibilities:** "How things work."
- They fetch data using custom TanStack Query hooks.
- They handle render orchestration (loading ui, error ui, empty state, etc)
- They pass data down to presentational components.
- **Rule:** They should contain minimal or no layout styles (HTML/CSS).

#### Components (Dumb Components)

Located in `src/components/`.

- **Responsibilities:** "How things look."
- They are highly reusable and visually focused (e.g., shadcn/ui components).
- They remain completely stateless regarding backend data. All data and event handlers come exclusively via `props`.
- **Rule:** Never import a hook that fetches data (`useQuery`, stores, etc.) directly into a presentational component.

---

## 🔄 Data Flow Visualization

This is the standard flow of data for a feature implementation in Pagar:

```text
               [ Backend API / Internal Promise Mock ]
                              │
                              ▼
                      [ RPC Layer ] (network fetch)
                              │
                              ▼
            [ Zod Schema validation ] (Catches drift early)
                              │
                              ▼
                   [ TypeScript Mapper ]
                              │
                              ▼
       [ Custom Hook wrapper w/ TanStack Query ] (Caching / Async State)
                              │
                              ▼
            [ Smart Component / Container ] (Business logic orchestration)
                              │
                              ▼
           [ Dumb Component / Presentational UI ] (Props rendering)
```

---

## 📂 Expected Directory Flow

We maintain a simplified, flattened technical directory structure to focus on velocity rather than architectural debate:

```text
src/
 ├─ rpc/           # Unified API calls (with internal manual mocks if needed)
 ├─ types/         # Domain models and API boundaries
 │   ├─ dto.ts     # Zod schemas & types for backend DTOs (The Anti-Corruption Layer)
 │   ├─ mappers.ts # Pure functions mapping backend DTOs to UI Models
 │   └─ ui.ts      # Frontend domain models/interfaces
 │   └─ index.ts   # Barrel exports
 ├─ hooks/         # TanStack Query standard and custom hooks
 ├─ containers/    # Smart components (Data orchestrators)
 └─ components/    # Dumb components (UI primitives and layouts)
```