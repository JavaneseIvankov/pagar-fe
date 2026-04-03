# Codebase Drift Remediation Tasks

This document tracks the original drift backlog and its current status after the RPC/types/container migration pass and the contract-client migration work under `src/lib/api/*`.

## 2026-04-03 Snapshot Resync

The copied `src/lib/api/*` snapshot was refreshed again on 2026-04-03. That refresh superseded the older assumption that only deferred profile work remained.

What changed in the newer snapshot:
- `src/lib/api/report-export.ts` was added and exported through `src/lib/api/index.ts`
- auth recovery endpoints now exist: `forgotPassword`, `resetPassword`
- profile read endpoints now exist: `getPublicProfile`, `getAdminProfile`
- public and school dashboard report endpoints now expose paginated searchable query/meta envelopes

What the follow-up integration pass already adopted:
- forgot-password and reset-password flows are now wired to the copied client
- report RPC now dispatches between public/school paginated list endpoints while preserving the existing RPC surface
- periodic report export now uses `createSppgReportExportHelper(...)` behind a server route wrapper
- synthetic periodic report URLs were removed from frontend domain types

What remains intentionally deferred:
- profile implementation still has explicit follow-up work, but it is now deferred by team choice rather than blocked by missing public/admin read contracts

## API Contract Integration Plan

The project now has a more up-to-date backend contract surface under:
- `src/lib/api/api-client.ts`
- `src/lib/api/api-contract.ts`
- `src/lib/api/dto.ts`

That contract should become the integration source of truth. The agreed migration direction is:

```text
UI / containers -> hooks -> rpc (server action) -> lib/api client -> backend
```

Key architecture decisions:
- `src/rpc/*` remains the only app-facing data boundary for hooks and UI
- `src/rpc/*` will become server-action-backed instead of mock-backed
- `src/lib/api/*` owns backend transport and DTO validation
- `src/types/mappers.ts` remains the anti-corruption mapping layer from backend DTOs to frontend domain models
- hooks and UI must not import `src/lib/api/*` directly
- no extra `server-actions/*` adapter layer will be introduced unless later performance/debugging pressure justifies it

What this means in practice:
- contract drift must now be resolved against `src/lib/api/dto.ts`, not against `src/types/dto/index.ts`
- `src/types/dto/index.ts` should be removed so stale imports fail loudly and are fixed immediately
- any existing `src/types/dto/index.ts` consumers are migration bugs, not acceptable compatibility shims
- current mock-backed RPC modules are now transitional infrastructure, not target architecture
- the shared API client should be instantiated once and reused; auth stays request-scoped through dynamic token resolution, not per-request client construction
- barrel import conventions should be restored after the contract cutover so the codebase does not drift into ad hoc deep imports

## Contract Migration Batches

### Integration Batch A
- establish shared RPC server-action conventions over `src/lib/api/*`
- remove `src/types/dto/index.ts` and fix all resulting stale imports
- centralize backend base URL and auth-token injection for the contract client
- convert the contract client helper to a shared instance rather than per-request construction
- decide and document how `ApiClientError` is normalized for hooks/UI consumers

### Integration Batch B
- fix auth by moving `src/rpc/auth.ts` onto the contract client
- update auth forms/actions to the role-specific registration contract exposed by `src/lib/api/api-contract.ts`
- restore barrel-based imports where they remain semantically correct
- restore build-green status

### Integration Batch C
- migrate admin dashboard and admin account-management RPC modules off mocks and onto the contract client
- keep hooks and containers unchanged apart from any DTO-driven domain adjustments

### Integration Batch D
- migrate SPPG dashboard, report list, report detail, and periodic report RPC modules off mocks and onto the contract client
- reconcile any domain mapping changes required by the real backend DTOs

### Integration Batch E
- reassess profile work (`T11`, `T12`, `T13`) against the contract coverage already present in `src/lib/api/api-contract.ts`
- proceed only on the profile surfaces that now have sufficient backend contract definition

### Integration Batch F
- remove dead mock-only transport helpers once all covered slices use the contract client
- run final verification and close out the drift backlog

Current state snapshot:
- `src/lib/api/dto.ts` is the intended contract source of truth
- Domain models, mappers, and the `src/types` barrel remain in place
- Reports, dashboards, periodic reports, and admin account management still flow through RPC modules instead of pages/containers reading mock data directly
- Shared helpers remain under `src/lib/formatters/` and `src/lib/ui-mappers/`
- `src/rpc/mock-backend.ts` still derives response types from DTO schemas with `z.infer` plus `satisfies`
- The SPPG create-report flow is still intentionally hook-owned rather than force-extracted into a fake shared contract
- The public profile flow no longer accepts caller-supplied role injection, but its read path is still backed by temporary frontend-local schemas and handcrafted mocks in `src/rpc/profile.ts`
- The current public/school profile seam is not equally exercised today: `buildCurrentProfileMock()` is effectively pinned to the `PUBLIC` variant unless code is changed
- The dashboard profile routes exist at `src/app/dashboard/sppg/profil/page.tsx` and `src/app/dashboard/admin/profil/page.tsx`
- Those dashboard profile routes are now thin composition shells, and their containers already use explicit hooks plus presentational cards
- The SPPG/admin dashboard profile surfaces are still intentionally read-only until realistic mutation contracts exist
- The admin account-management route remains aligned with the RPC/domain/hook/container standard
- `src/types/dto/index.ts` should no longer be treated as a valid compatibility layer; the correct end state is its removal
- `pnpm lint` currently passes
- the active migration risk is mixed-contract usage: some slices still reference old DTO imports while newer work already depends on `src/lib/api/*`
- the active cleanup target is to make stale contract imports fail early, then repair them against `src/lib/api/*`

The remaining work is no longer just profile-boundary polish. It is now split between:
- migrating the app’s RPC boundary onto the new `src/lib/api/*` contract surface,
- removing the old DTO source so the codebase cannot silently mix old and new backend contracts,
- finishing the profile foundation and the remaining read-only profile slice tail, and
- restoring consistent client construction and barrel-import conventions after the contract cutover

## Remaining Dependency Summary

```text
T11 ─┬─> T12 ──┐
     └─> T13 ──┼─> T10

T15 ─┬─> T16 ─┬─> T17 ──┐
     └────────┴─> T18 ──┼─> T10
                        └─> T11

T09, T14 (closed: no further action required)
```

## Recommended Execution Batches

### Batch 1
- `T15` Remove `src/types/dto/index.ts`, establish the contract-client-backed RPC pattern, and fix auth/register flows

### Batch 2
- `T16` Migrate admin RPC slices onto `src/lib/api/*` and shared client usage
- `T17` Migrate SPPG/report RPC slices onto `src/lib/api/*` and remove any remaining mixed DTO imports

### Batch 3
- `T18` Reassess and migrate profile RPC slices where contract coverage is sufficient
- `T12` Finalize the SPPG dashboard profile slice on top of the corrected profile foundation
- `T13` Finalize the admin dashboard profile slice on top of the corrected profile foundation

### Batch 4
- `T10` Final cleanup, verification, and backlog closeout

### Closed / Non-Blocking
- `T09` Keep the SPPG create-report form contract hook-owned unless a stronger practical reason appears
- `T14` Migrate admin account-management route onto the RPC/domain/hook/container standard

## Status Summary

- Completed: `T01`, `T02`, `T03`, `T04`, `T05`, `T06`, `T07`, `T08`, `T14`
- Closed without further action: `T09`
- In Progress: `T11`
- Partial / Tail Remaining: `T12`, `T13`
- New urgent blockers: `T15`, `T16`, `T17`, `T18`
- Pending closeout: `T10`

## Completed Tasks

## `T01` DTO Audit and Types Boundary Alignment
- Status: Completed
- Outcome:
  - `src/types/dto/index.ts` remains the DTO source
  - `src/types/mappers.ts`, `src/types/ui.ts`, and `src/types/index.ts` remain in place
  - Consumers still work with domain models after the RPC boundary

## `T02` Shared Formatters and UI Mappers
- Status: Completed
- Outcome:
  - Shared helpers exist under `src/lib/formatters/`
  - Shared status/UI mapping helpers exist under `src/lib/ui-mappers/`
  - Inline duplication was reduced across reports and dashboards

## `T03` Reports, Public Reviews, and Report Detail Data Flow
- Status: Completed
- Outcome:
  - RPC modules and query hooks exist for report list, public reviews, and report detail
  - Query keys remain centralized in `src/lib/query-keys.ts`
  - Report UI still consumes mapped domain models

## `T04` Dashboard and Admin Data Flow
- Status: Completed
- Outcome:
  - SPPG dashboard and admin dashboard still resolve through RPC plus hooks
  - Containers no longer read dashboard mock data directly

## `T05` Periodic Reports Data Flow
- Status: Completed
- Outcome:
  - Periodic reports still resolve through RPC plus hooks
  - The page-level mock-data path remains removed

## `T06` Reports/Public Report UI Migration
- Status: Completed
- Outcome:
  - Report containers/pages were migrated to the new boundary
  - Shared formatting helpers are used in the migrated UI
  - The report-status gap was resolved in the domain layer

## `T07` Dashboard/Admin UI Migration
- Status: Completed
- Outcome:
  - Dashboard/admin containers now use hooks
  - Shared formatting and status mappers replaced duplicated inline logic

## `T08` Periodic Report Page Migration
- Status: Completed
- Outcome:
  - The periodic reports page now renders through a container
  - Shared currency/status helpers are in use

## `T14` Migrate Admin Account-Management Route
- Status: Completed
- Outcome:
  - `src/app/dashboard/admin/kelola-akun/page.tsx` remains a thin route shell
  - frontend-owned admin account domain types exist in `src/types/ui.ts`, with DTO-to-domain mapping in `src/types/mappers.ts`
  - `src/rpc/admin-accounts.ts` and `src/hooks/use-admin-account-management.ts` provide the active-account list, pending-account list, and account-status update mutation through the RPC/domain boundary
  - `src/containers/admin-kelola-akun-container.tsx` consumes those hooks instead of inline arrays
  - `src/components/admin/kelola-akun/data-akun-card.tsx` and `src/components/admin/kelola-akun/validasi-akun-card.tsx` are presentational cards over domain data

## Remaining Tasks

## `T09` Keep the SPPG Create-Report Form Contract Hook-Owned
- Status: Closed
- Goal: preserve a form contract that is easy to understand and naturally aligned with the persisted SPPG create-report hook.
- Current Decision:
  - `src/components/dashboard/sppg/create-report-form.tsx` is allowed to import `TCreateReportForm` from `src/hooks/use-persisted-sppg-create-report-form.ts`
  - This coupling is acceptable because the type directly describes the structure owned by that form flow rather than a cross-feature domain contract
- Deliverables:
  - Do not extract `TCreateReportForm` purely for layering aesthetics
  - If a neutral shared contract module was introduced only to satisfy the earlier plan, treat that as a rollback candidate rather than target architecture
  - Keep orchestration and persistence logic in the container/hook layer
- Write Scope:
  - None by default
  - Only touch the form files if reverting an unnecessary abstraction introduced by the earlier plan
- Dependencies:
  - None
- Parallel Notes:
  - Does not gate the remaining profile/auth work

## `T11` Expand Profile Domain and RPC Foundation
- Status: In Progress
- Goal: extend the profile foundation so public, school, SPPG, and admin profile surfaces can all sit behind the same anti-corruption boundary without leaking role selection to consumers.
- Current Gap:
  - `src/rpc/profile.ts` still uses temporary frontend-local schemas and handcrafted mocks rather than backend-aligned DTO contracts
  - the active profile read path bypasses `src/rpc/mock-backend.ts` entirely today
  - only the school profile has a backend-owned DTO contract in `src/types/dto/index.ts`; the broader current-profile/dashboard-profile foundation is still transitional
  - the public/school seam is not equally exercised because the current mock builder is effectively pinned to `PUBLIC`
  - `TPublicProfile` and `TSchoolProfile` exist in `src/types/ui.ts`, but `PublicProfileForm` still consumes `TUser` and `SchoolProfileForm` still consumes `TSchool` rather than the richer profile domain shapes
  - SPPG/admin dashboard profile surfaces are read-only and public profile submit behavior is still local-only placeholder logic
  - any approach that requires the consumer to pass `role` into `fetchCurrentProfile()` or `useCurrentProfile()` remains semantically wrong for real backend integration
  - frontend-only mocks must not add fictional contracts into `src/types/dto/index.ts`; temporary mock validation must stay in frontend-owned code until a real backend contract exists
- Current Progress:
  - `useCurrentProfile()` no longer accepts caller-supplied role
  - `ProfileContainer` no longer casts to `TSchool`
  - `useCurrentSppgProfile()` and `useCurrentAdminProfile()` now expose explicit role/surface-specific read hooks
  - temporary mock validation still lives in `src/rpc/profile.ts`, not in `src/types/dto/index.ts`
- Deliverables:
  - Define the intended domain model strategy for current-profile and dashboard-profile surfaces
  - Keep current-profile semantics resolved by the auth/backend boundary, not by caller-supplied role arguments
  - Decide whether the correct consumer-facing API is:
    - one realistic current-profile hook with no `role` parameter, or
    - explicit role/surface-specific hooks or RPC functions whose semantics are encoded in the entrypoint name rather than injected by the consumer
  - Replace the hardcoded public-only mock seam with something that exercises the supported variants realistically, or explicitly document the limitation in the implementation if the backend contract is still unavailable
  - Finish migrating public/school profile forms onto the richer profile domain types if those types are intended to remain canonical
  - Introduce realistic write/update semantics before any profile surface is treated as fully complete
- Write Scope:
  - `src/types/*`
  - `src/rpc/profile.ts`
  - `src/hooks/use-current-profile.ts`
  - `src/lib/query-keys.ts` only if profile queries need to be split further
  - `src/containers/profile-container.tsx`
  - `src/components/profile/public-profile-form.tsx`
  - `src/components/profile/school-profile-form.tsx`
- Dependencies:
  - None
- Parallel Notes:
  - Foundational task for `T12` and `T13`
  - Should avoid editing SPPG/admin dashboard profile containers beyond shared contract touchpoints

## `T15` Remove Old DTO Source and Stabilize the Contract Boundary
- Status: In Progress
- Goal: make `src/lib/api/*` the only valid backend contract source and force stale imports to fail early.
- Current Gap:
  - `src/types/dto/index.ts` still exists and makes mixed old/new contract imports possible
  - some migrated code already uses `src/lib/api/dto.ts`, while other code still pulls schema types from the old DTO module
  - the temporary contract client helper currently favors correctness over cleanliness by constructing client instances per call
  - some recent edits bypassed barrel imports to make server-action boundaries explicit, which diverges from project convention
- Deliverables:
  - delete `src/types/dto/index.ts`
  - fix all resulting compile failures by moving DTO/schema imports to `src/lib/api/dto.ts`
  - ensure the app builds with no remaining old DTO references
  - convert the API client helper to a shared instance with request-time auth token resolution
  - restore barrel-based imports where they do not break the server/client boundary semantics
- Write Scope:
  - `src/types/*`
  - `src/rpc/*`
  - `src/lib/api/*`
  - `src/lib/auth/*`
  - hooks/components only where imports or call surfaces need to be normalized
- Dependencies:
  - None
- Parallel Notes:
  - must land before treating `T16` or `T17` as complete
  - intentionally creates loud compile failures as part of the migration strategy

## `T12` Finalize SPPG Dashboard Profile Route
- Status: Partial
- Goal: finish aligning the `/dashboard/sppg/profil` slice with the corrected profile foundation and realistic surface semantics.
- Current State:
  - `src/app/dashboard/sppg/profil/page.tsx` is already a thin route shell
  - `src/containers/sppg-profile-container.tsx` already consumes an explicit SPPG read hook plus loading/error states
  - `ProfileHeaderCard`, `SppgProfessionalInfoCard`, and `SppgAccountSettingsCard` are already prop-driven presentational components
  - the read path is now contract-backed through `getSppgProfile`, with DTO-to-domain mapping happening in `src/types/mappers.ts`
- Remaining Tail:
  - confirm the remaining placeholder/fallback fields on the SPPG profile domain are acceptable until richer backend profile metadata exists
  - introduce realistic mutation/update semantics when a real contract exists
  - until then, keep the read-only state explicit rather than implicit
- Write Scope:
  - `src/containers/sppg-profile-container.tsx`
  - `src/components/profile/profile-header-card.tsx`
  - `src/components/profile/sppg-professional-info-card.tsx`
  - `src/components/profile/sppg-account-settings-card.tsx`
  - `src/app/dashboard/sppg/profil/page.tsx` only if route-shell cleanup is still needed
- Dependencies:
  - `T11`
- Parallel Notes:
  - Safe to run in parallel with `T13`
  - Should avoid editing admin profile files

## `T13` Finalize Admin Dashboard Profile Route
- Status: Partial
- Goal: finish aligning the `/dashboard/admin/profil` slice with the corrected profile foundation and realistic surface semantics.
- Current State:
  - `src/app/dashboard/admin/profil/page.tsx` is already route composition
  - `src/containers/admin-profile-container.tsx` already consumes an explicit admin read hook plus loading/error states
  - `AdminAccountSettingsCard` and `AdminAccessDetailsCard` are already presentational
  - access-detail content is no longer container-local constants; it is mapped through `src/lib/ui-mappers`
- Remaining Tail:
  - consume the corrected shared profile foundation from `T11`
  - confirm the admin profile contract is aligned with the intended backend-facing foundation
  - introduce realistic mutation/update semantics when a real contract exists
  - keep the read-only state explicit until then
- Write Scope:
  - `src/containers/admin-profile-container.tsx`
  - `src/components/profile/admin-account-settings-card.tsx`
  - `src/components/profile/admin-access-details-card.tsx`
  - `src/app/dashboard/admin/profil/page.tsx` only if route-shell cleanup is still needed
- Dependencies:
  - `T11`
- Parallel Notes:
  - Safe to run in parallel with `T12`
  - Should avoid editing SPPG profile files

## `T15` Realign Auth Boundary with Rewritten DTO Contracts
- Status: New
- Goal: establish the server-action-backed RPC pattern over `src/lib/api/*`, starting with auth, and restore build-green compatibility with the latest backend contract.
- Current Gap:
  - `src/lib/api/*` now contains the most up-to-date backend DTOs and endpoint manifest, but nothing in the app is using that client surface yet
  - `src/rpc/auth.ts` still imports generic register schemas/responses that no longer exist in `@/types`
  - `src/types/mappers.ts` still imports the removed `registerSuccessResponseSchema`
  - the current auth/forms layer models the older generic input contract and does not collect the richer fields now required by the contract surface (for example `email`, `school_name`, `school_address`, `sppg_name`, `sppg_address`)
  - `pnpm build` currently fails at module compilation before end-to-end verification can proceed
- Deliverables:
  - create the shared pattern for `rpc as server action` over `src/lib/api/*`
  - centralize contract-client setup, backend base URL configuration, and auth-token injection
  - update `src/rpc/auth.ts` to call the contract client instead of local mock-backed DTO imports
  - update `src/types/mappers.ts` to map the new register response shapes correctly
  - update auth actions/forms so the inputs they collect and pass match the chosen contract shape
  - restore a build-green auth path
- Write Scope:
  - `src/lib/api/*` only if small ergonomics or setup helpers are needed
  - `src/rpc/auth.ts`
  - `src/types/mappers.ts`
  - `src/lib/auth/actions.ts`
  - `src/components/auth/register-public-form.tsx`
  - `src/components/auth/register-school-form.tsx`
  - `src/components/auth/register-sppg-form.tsx`
  - `src/types/*` only if a stable frontend-facing auth/domain contract needs to be clarified
- Dependencies:
  - None
- Parallel Notes:
  - Immediate blocker for claiming repository health
  - Establishes the pattern the remaining RPC migrations should follow
  - Should land before `T10`, `T16`, `T17`, and `T18`

## `T16` Migrate Admin RPC Slices onto `src/lib/api/*`
- Status: New
- Goal: move the admin dashboard and admin account-management RPC modules from mock-backed transport to the contract client while keeping hooks and containers stable.
- Current Gap:
  - `src/rpc/admin-dashboard.ts` and `src/rpc/admin-accounts.ts` still use local mock builders
  - admin hooks and containers are structurally correct, but their transport is still transitional
- Deliverables:
  - make the admin RPC modules server-action-backed
  - call the matching endpoints from `src/lib/api/api-contract.ts`
  - preserve DTO-to-domain mapping in `src/types/mappers.ts`
  - keep `src/hooks/use-admin-dashboard.ts` and `src/hooks/use-admin-account-management.ts` stable unless query semantics genuinely need adjustment
- Write Scope:
  - `src/rpc/admin-dashboard.ts`
  - `src/rpc/admin-accounts.ts`
  - `src/types/mappers.ts`
  - `src/hooks/use-admin-dashboard.ts` only if needed
  - `src/hooks/use-admin-account-management.ts` only if needed
- Dependencies:
  - `T15`
- Parallel Notes:
  - Safe to run independently from the SPPG/report migration

## `T17` Migrate SPPG/Report RPC Slices onto `src/lib/api/*`
- Status: In Progress
- Goal: move the SPPG dashboard, report list, report detail, and periodic-report RPC modules from mock-backed transport to the contract client while keeping hooks and containers stable.
- Current Gap:
  - `src/rpc/reports.ts` still relies on local mock builders
  - the public `/laporan-sppg` surface currently has list coverage through the public dashboard endpoint shape, but it does not have a real public detail contract
  - the protected SPPG daily-report detail endpoint cannot be treated as a valid public-route data source under the current auth model
- Current Progress:
  - `src/rpc/sppg-dashboard.ts` is already contract-backed
  - `src/rpc/periodic-reports.ts` is already contract-backed
  - the public report surface is being tightened so it does not imply unsupported public detail access
- Deliverables:
  - make the SPPG/report RPC modules server-action-backed
  - call the matching endpoints from `src/lib/api/api-contract.ts`
  - reconcile domain mapping changes caused by the real backend DTOs
  - keep the existing hooks and containers stable where possible
- Write Scope:
  - `src/rpc/reports.ts`
  - `src/rpc/sppg-dashboard.ts`
  - `src/rpc/periodic-reports.ts`
  - `src/types/mappers.ts`
  - `src/hooks/use-public-reviews.ts` only if needed
  - `src/hooks/use-sppg-reports.ts` only if needed
  - `src/hooks/use-sppg-report-detail.ts` only if needed
  - `src/hooks/use-sppg-dashboard.ts` only if needed
  - `src/hooks/use-sppg-periodic-reports.ts` only if needed
- Dependencies:
  - `T15`
- Parallel Notes:
  - Safe to run independently from the admin migration

## `T18` Reassess and Migrate Profile RPC Slices onto `src/lib/api/*`
- Status: In Progress
- Goal: determine exactly which profile surfaces are now unblocked by the contract client and migrate only the slices that have sufficient backend contract coverage.
- Current Gap:
  - the profile surface is still the least settled slice in the app
  - `src/lib/api/api-contract.ts` clearly covers some profile endpoints (`getSchoolProfile`, `updateSchoolProfile`, `getSppgProfile`, `updateSppgProfile`, `updateProfile` for admin mutation), but not every read surface currently modeled in `src/rpc/profile.ts`
  - `src/rpc/profile.ts` remains frontend-local and mock-backed today
- Current Progress:
  - the SPPG dashboard profile read path now uses `getSppgProfile`
  - the next safe covered target is the `SCHOOL` branch of `/profil`
  - the `PUBLIC` current-profile read still lacks backend contract coverage and must remain explicit fallback behavior for now
- Deliverables:
  - audit the contract coverage for public, school, SPPG, admin, and current-user profile semantics
  - migrate the slices that now have sufficient backend contract definition
  - explicitly record any remaining backend contract gaps before treating `T11`/`T12`/`T13` as fully unblocked
- Write Scope:
  - `src/rpc/profile.ts`
  - `src/types/mappers.ts`
  - `src/hooks/use-current-profile.ts`
  - profile containers/forms only if the contract migration requires it
- Dependencies:
  - `T15`
- Parallel Notes:
  - Should run after the base RPC contract pattern is established
  - May collapse part of `T11` if the backend contract coverage is sufficient

## `T10` Cleanup, Verification, and Backlog Closeout
- Goal: finish the remaining drift cleanup after the corrected profile/auth work lands.
- Deliverables:
  - Run `pnpm format`
  - Run `pnpm lint`
  - Run `pnpm build`
  - Re-check for any remaining direct architectural leaks introduced during the final pass
  - Update this document to mark the backlog complete or record any newly discovered follow-up items
- Write Scope:
  - Any residual cleanup across touched files
  - This document
- Dependencies:
  - `T12`
  - `T13`
  - `T15`
  - `T16`
  - `T17`
  - `T18`
- Parallel Notes:
  - Final integration task
  - Should run after the corrected profile foundation and the contract-client RPC migration have landed
