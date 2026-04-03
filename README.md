# 🍽️ PaGar (Pantau Gizi & Anggaran) Frontend

PaGar is a modern web application built with **Next.js 16** and **React 19** serving as a food and nutrition reporting platform. The application promotes transparency in public nutrition programs and budget realization in Indonesia. 

The frontend enforces a strict anti-corruption boundary through Zod DTO validation and domain mapping before feeding data into the application, guaranteeing resilience between the server API responses and the presentation layer, with schema-drift reporting.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19, shadcn/ui, Tailwind CSS v4
- **State Management:** TanStack Query v5 (Server State), Zustand (Client State)
- **Forms & Validation:** React Hook Form, Zod v4
- **Tooling:** Biome (Linting & Formatting), pnpm

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- [pnpm](https://pnpm.io/installation) (v8 or higher)

### Installation

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

> Set `PAGAR_API_BASE_URL` in `.env.local` to point to your local or remote backend origin.

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser. The app serves a public landing page at the root route.

## 🔐 Authentication & Seed Accounts

Authentication interfaces with the real backend API, using server actions and server-owned session cookies (`src/lib/auth/` and `src/rpc/auth.ts`). Role-based route protection and navigation handling is governed by `src/proxy.ts`. 

## 🏗️ Architecture & Data Flow

The application enforces a strict **Anti-Corruption Layer (ACL)** to separate frontend domain models from backend data transfer objects (DTOs):

```text
Backend API -> RPC Layer Schema Validation (Zod) -> DTO to Domain Mapping -> TanStack Query -> Container -> Presentational Component
```

- **RPC Layer (`src/rpc/`):** Network calls utilizing the custom API client (`server-api-client.ts`). Validates and maps payload boundaries.
- **Smart/Dumb Components:** 
  - `src/components/`: Pure, presentational UI components.
  - `src/containers/`: Smart components that handle orchestration, state, and data fetching.
- **Contracts (`src/types/`):** Backend DTO schemas live in `src/types/` along with application domain models and mappers.


## 🗂️ Project Structure

```text
src/
├── app/          # Next.js App Router pages, layouts, and API routes
├── components/   # Dumb/presentational UI components (including shadcn/ui)
├── containers/   # Smart orchestration components handling data/logic
├── hooks/        # Custom React hooks (TanStack Query, Zustand, etc.)
├── lib/          # Utilities, formatters, auth logic, and query keys
├── rpc/          # RPC layer for network calls, API client wrappers
└── types/        # DTO schemas, domain models, and mappers
```

## 🗺️ Route Overview

- **Public:** 
  - `/` (Landing Page)
  - `/laporan-masyarakat`, `/laporan-sppg`, `/laporan-sppg/[id]`
  - `/auth/masuk`, `/auth/daftar`, `/auth/lupa-kata-sandi`
- **Protected (Public Role):** 
  - `/profil`
  - `/tambah-laporan`
- **SPPG Dashboard:** 
  - `/dashboard/sppg` (Main)
  - `/dashboard/sppg/manajemen-laporan`
  - `/dashboard/sppg/laporan-periodik`
  - `/dashboard/sppg/laporan-publik`
  - `/dashboard/sppg/profil`
- **Admin Dashboard:** 
  - `/dashboard/admin` (Main)
  - `/dashboard/admin/kelola-akun`
  - `/dashboard/admin/keluhan`
  - `/dashboard/admin/profil`

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js development server with Turbopack |
| `pnpm build` | Builds the app for production (includes type-checking) |
| `pnpm start` | Runs the built production application |
| `pnpm format` | Auto-formats code using Biome (`--write`) |
| `pnpm lint` | Lints code using Biome |
| `pnpm lint:strict` | Lints code using Biome and strictly errors on warnings |

> **Note:** A Husky pre-commit hook runs `pnpm format && pnpm lint` automatically before every commit to ensure code quality.
