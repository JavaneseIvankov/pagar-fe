# Pagar – Frontend Early Stage Architecture Proposal

> Note to Jury: This repository will serve as the actual frontend codebase for Pagar. However, the current architecture decisions are based on our present needs, constraints, and some patterns we want to experiment with during development. As we learn more about the product and its technical challenges, some of these decisions may evolve or be refactored.

The focus of this document is to explain the reasoning behind our current structure, especially around data flow, type safety, and maintainability, rather than presenting a finalized or rigid architecture

## 🎯 Vision

Our main goal with this exploration is to design a frontend that stays stable even when backend responses change, while also keeping the codebase maintainable as the project grows.

We also want to reduce tight coupling between UI components and backend responses, since this usually becomes painful to refactor later. At the same time, we care a lot about developer experience, especially around type safety and debugging.

## 🏗️ Proposed Architecture

We are experimenting with a layered approach where data responsibilities are clearly separated instead of letting components directly handle everything.

### 1. Data Flow Concept

Instead of letting React components fetch and process data directly, we propose this flow:

```
Backend API → RPC Layer → Validation & Transformation (Zod) → TanStack Query & Custom Hooks → Container (Smart) Components → Presentational (Dumb) Components
```

The idea is simple:

* RPC layer handles communication
* Zod ensures data is valid and reshapes it if needed
* TanStack Query handles caching and async state
* Components only focus on rendering

This way components don't need to worry about inconsistent API responses or data formatting.

### 2. Zod for DTO Validation & Pure TypeScript Mappers

One pattern we want to explore is treating Zod purely as the validation boundary between the backend and frontend, while keeping data transformation as pure TypeScript.

Normally we would:
* Define TypeScript interfaces for backend responses
* Write mapper functions
* Hope backend responses stay consistent (leading to silent UI bugs, or even crashes if they don't)

Instead, we want to:
1. Define DTO schemas directly in Zod to ensure runtime safety at the network fetch layer.
2. Infer the safe DTO type strictly from the Zod schema.
3. Use explicit, pure TypeScript functions to map the validated DTO into frontend-friendly presentational shapes (Domain models).

**Concept example:**

```typescript
import { z } from "zod";

// 1. Zod Schema: Validates the backend response (Anti-Corruption Layer)
export const ReportDTOSchema = z.object({
  id: z.string(),
  created_at: z.string(),
});

// 2. Inferred DTO Type
export type ReportDTO = z.infer<typeof ReportDTOSchema>;

// 3. UI/Domain Shape (What our React components actually use)
export interface Report {
  id: string;
  createdAt: Date;
}

// 4. Pure Mapper Function: Transforms data after Zod guarantees its shape
export const mapReportDTOToUI = (dto: ReportDTO): Report => ({
  id: dto.id,
  createdAt: new Date(dto.created_at),
});
```
This way we can enforce runtime type-safety and stability.
One parsed DTO can be mapped into multiple presentational types (which can contain transformed/derived properties). 

### 3. Folder Structure & Organization

Currently, we are intentionally **not** using a strict feature-based project structure (e.g., Feature Sliced Design). 

To prioritize development speed and reduce "options fatigue" (spending too much time debating where a specific file belongs), we are sticking to a simpler, flatter structure grouped by technical grouping (e.g., global components, hooks, types). 
Later if the needs for better separation exists, we can refactor project directory structure.

### 4. Smart/Dumb Component Pattern (Container & Presentational)

To keep our UI components highly reusable and independent, we are adopting the Smart/Dumb component pattern.

* **Smart Components (Containers):** Responsible for *how things work*. They fetch data (using our TanStack Query hooks), manage complex state, handle side effects, and coordinate interactions. They generally avoid containing layout styles or complex DOM markup.
* **Dumb Components (Presentational):** Responsible for *how things look*. They are largely stateless, receive data and callbacks exclusively via props, and have no dependencies on the rest of the application (like data fetching or global stores).


We believe this is the most pragmatic approach for the early phases of development. However, we will continuously monitor the codebase and are fully prepared to refactor into a feature-based structure in the future if the project size and complexity demand it.
