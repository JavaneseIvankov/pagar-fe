# Pagar Frontend

Pagar is a Next.js 16 frontend for a food and nutrition reporting platform. The UI language is Indonesian. This repository currently runs against a frontend-owned mock RPC layer while keeping a strict anti-corruption boundary through Zod DTO validation and domain mapping.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- TanStack Query
- Zustand
- react-hook-form + Zod
- Biome
- pnpm

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm format
pnpm lint
pnpm lint:strict
```

There is currently no test runner configured.

## Running Locally

1. Install dependencies:

```bash
pnpm install
```

2. Start the app:

```bash
pnpm dev
```

3. Open `http://localhost:3000`.

## Current Route Behavior

The app does not serve a content page at `/` for now.

- `/` redirects to `/laporan-masyarakat` for unauthenticated users.
- `/` redirects to the authenticated landing page for signed-in users.
- `/dashboard` redirects to the correct dashboard landing page or `/auth/masuk`.

This interception is handled by [`src/proxy.ts`](./src/proxy.ts).

## Route Overview

Public surfaces:

- `/laporan-masyarakat`
- `/laporan-sppg`
- `/laporan-sppg/[id]`
- `/auth/masuk`
- `/auth/daftar`
- `/auth/daftar/publik`
- `/auth/daftar/sekolah`
- `/auth/daftar/sppg`
- `/auth/lupa-kata-sandi`

Protected public-role surfaces:

- `/profil`
- `/tambah-laporan`

SPPG dashboard:

- `/dashboard/sppg`
- `/dashboard/sppg/manajemen-laporan`
- `/dashboard/sppg/laporan-periodik`
- `/dashboard/sppg/profil`

Admin dashboard:

- `/dashboard/admin`
- `/dashboard/admin/kelola-akun`
- `/dashboard/admin/profil`

## Authentication

Authentication currently uses:

- server actions in [`src/lib/auth/actions.ts`](./src/lib/auth/actions.ts)
- a server-owned session cookie
- route gating in [`src/proxy.ts`](./src/proxy.ts)
- navigation policy in [`src/lib/auth/navigation.ts`](./src/lib/auth/navigation.ts)

The session cookie is parsed and serialized in [`src/lib/auth/cookie.ts`](./src/lib/auth/cookie.ts).

### Mock Credentials

Use these accounts locally:

- `admin.pagar` / `Admin123`
- `sppg-berkah-nutrisi` / `Sppg1234`
- `sdn-kauman-1` / `School123`
- `warga.malang` / `Public123`

### Important Limitation

The auth backend is still mock-only.

- login and registration run through [`src/rpc/auth.ts`](./src/rpc/auth.ts)
- user records are stored in module memory, not a real database
- new registrations are not a production-ready persistence model

This means auth behavior is shaped like a real app boundary, but the backing store is temporary.

## Architecture

The main application flow is:

```text
Backend or Mock Source
-> RPC Layer
-> Zod Validation
-> DTO to Domain Mapping
-> Query Hook / Server Read
-> Container
-> Presentational Component
```

Core rules in this repo:

- RPC functions validate and map before returning data.
- Components in `src/components/` stay presentational.
- Smart orchestration belongs in `src/containers/` and hooks.
- Frontend-only mock modeling belongs in frontend-owned modules, not backend contract files.
- `src/types/dto/index.ts` is treated as backend-owned contract space.

## Project Structure

```text
src/
  app/          Next.js routes and layouts
  components/   Presentational UI
  containers/   Smart orchestration components
  hooks/        Custom hooks
  lib/          Shared utilities and auth module
  rpc/          RPC layer and mock backend boundaries
  types/        DTO schemas, domain types, and mappers
```

Relevant current modules:

- [`src/lib/auth/`](./src/lib/auth)
- [`src/rpc/`](./src/rpc)
- [`src/types/`](./src/types)

## RPC and Mock Data

The current RPC layer includes:

- [`src/rpc/auth.ts`](./src/rpc/auth.ts)
- [`src/rpc/reports.ts`](./src/rpc/reports.ts)
- [`src/rpc/profile.ts`](./src/rpc/profile.ts)
- [`src/rpc/sppg-dashboard.ts`](./src/rpc/sppg-dashboard.ts)
- [`src/rpc/admin-dashboard.ts`](./src/rpc/admin-dashboard.ts)
- [`src/rpc/admin-accounts.ts`](./src/rpc/admin-accounts.ts)
- [`src/rpc/periodic-reports.ts`](./src/rpc/periodic-reports.ts)

Shared mock response shaping for non-auth areas lives in [`src/rpc/mock-backend.ts`](./src/rpc/mock-backend.ts).

## UI Notes

- The public header is session-aware and reads session data from the server layout.
- Dashboard navigation is also session-aware.
- `/laporan-masyarakat` is the effective unauthenticated landing surface.

## Known Gaps

These areas are still not fully production-ready:

- auth still uses a mock in-memory user store
- forgot-password is an honest placeholder, not a real recovery flow
- profile update flows are still incomplete for some sppg and admin
- several dashboard/report areas still use mock RPC data

## Verification

Before committing, run:

```bash
pnpm format
pnpm lint
pnpm build
```

The Husky pre-commit hook also runs `pnpm format && pnpm lint`.
