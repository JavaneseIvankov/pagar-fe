# Codebase Drift Active Plan

This is the default working file for the current codebase-drift effort.

For historical context and completed work, see:
- `.agents/context/codebase-drift-archive.md`

## Current Architecture Decisions

- `src/rpc/*` remains the only app-facing data boundary for hooks and UI.
- `src/types/mappers.ts` remains the anti-corruption layer from backend DTOs to frontend domain models.
- Hooks and UI must not import `src/lib/api/*` directly.
- `src/lib/api/*` is the in-repo contract source of truth for this refresh pass.
- Contract-driven UI edits are allowed when refreshed DTO/request schemas force form-field, validation, or payload changes.
- Dedicated file/binary flows may use a server route wrapper when the copied client exposes a non-JSON helper outside `apiContract`.

## Current Status Snapshot

- `src/rpc/server-api-client.ts` remains the shared auth-aware client factory for the refreshed snapshot.
- The refreshed client snapshot is consumed by:
  - `src/rpc/auth.ts`
  - `src/rpc/admin-dashboard.ts`
  - `src/rpc/admin-accounts.ts`
  - `src/rpc/review-submission.ts`
  - `src/rpc/sppg-daily-report.ts`
  - `src/rpc/sppg-dashboard.ts`
  - `src/rpc/periodic-reports.ts`
  - `src/rpc/reports.ts`
  - the contract-backed branches inside `src/rpc/profile.ts`
- Auth recovery is now integrated:
  - forgot-password uses the real `forgotPassword` contract
  - reset-password uses the real `resetPassword` contract
  - login/register behavior and auth-session handling remain unchanged
- Report list RPC is now aligned with the refreshed paginated dashboard endpoints:
  - `PUBLIC` uses `getPublicDashboardReviews` and `getPublicDashboardSppgReports`
  - `SCHOOL` uses `getSchoolDashboardReviews` and `getSchoolDashboardSppgReports`
  - both branches preserve the current `page`/`limit` RPC surface and normalize through `toPaginatedResult(...)`
- Periodic report listing remains contract-backed through `src/rpc/periodic-reports.ts`.
- Periodic report export is now wired through the copied client helper:
  - `src/lib/api/report-export.ts` is consumed via `createSppgReportExportHelper`
  - `src/app/dashboard/sppg/laporan-periodik/export/route.ts` provides the server boundary for file download
  - `src/containers/sppg-periodic-reports-container.tsx` now triggers real periodic report downloads
  - synthetic `TSppgPeriodicReport.url` / `example.com` fallback URLs have been removed
- Periodic report mock payloads match the refreshed DTO shape, including pagination metadata.
- Public review submission now sends the required `title` field and enforces the refreshed 3MB image limit in the UI.
- SPPG daily report submission now sends the required `total_portion` field and enforces the refreshed 3MB image limit in the UI.
- Authenticated `/(public)/*` report pages remain contract-backed through `src/rpc/reports.ts`, and those report RPC functions intentionally stay out of the shared client barrel because they rely on server auth context.
- `/(public)/*` report routes are treated as authenticated-only app routes for `PUBLIC` and `SCHOOL`, which aligns their access model with the protected-header contract in `src/lib/api/*`.
- `/` remains a placeholder landing page, and `src/proxy.ts` no longer redirects root traffic to `/laporan-masyarakat`.
- Profile integration is now active on the refreshed contract surface:
  - `PUBLIC`: read contract-backed through `getPublicProfile`; update remains unavailable because there is still no public profile update contract
  - `SCHOOL`: read/write contract-backed through `getSchoolProfile` and `updateSchoolProfile`
  - `SPPG`: read contract-backed through `getSppgProfile`, and the current UI now wires `updateSppgProfile` for `sppg_name` and `sppg_address`
  - `ADMIN`: read contract-backed through `getAdminProfile`, and the current UI now wires `updateProfile` for name, email, username, and password
- Verification against the current workspace is now:
  - `pnpm lint`: green
  - `pnpm build`: blocked by unrelated `lucide-react` import usage in the landing-page dependency tree
  - `gitnexus_detect_changes(scope: "all")`: `critical`, driven by the refreshed `src/lib/api/*` transport snapshot plus the current auth/report/profile adoption work

## Current Blockers

- `GET /laporan-sppg/[id]` still does not expose budget detail in the copied contract snapshot. <Answer>The page remains integrated, but `src/rpc/reports.ts` keeps an explicit empty-budget fallback until the backend includes budget data in the detail response.</Answer>
- `PUBLIC` profile update still has no backend contract. <Answer>The read path is now real, but username/password editing for `PUBLIC` remains disabled until the backend exposes a dedicated update route.</Answer>
- `ADMIN` access details still have no backend metadata source. <Answer>The admin profile page now reads and updates through the backend, but `accessDetails` remains explicit frontend placeholder metadata until the backend returns permission/access-detail data.</Answer>
- Final verification is currently blocked by an unrelated workspace issue in the landing-page dependency tree. <Answer>`pnpm build` currently fails on a missing `lucide-react` import from `src/components/animate-ui/components/radix/accordion.tsx`; treat that as a separate workspace blocker, not an API integration regression.</Answer>
- GitNexus currently reports this dirty workspace as `critical`. <Answer>This is expected for the current pass because the refreshed `src/lib/api/*` snapshot itself changed shared transport internals (`api-client.ts`, `api-contract.ts`, `dto.ts`, `index.ts`) in addition to the adoption work under `src/rpc/auth.ts`, `src/rpc/reports.ts`, `src/rpc/profile.ts`, and the periodic/profile UI files.</Answer>

## Dependency Summary

```text
Closed:
T11
T12
T13
```

## Recommended Execution Batches

### Remaining Follow-Up
- Track backend gaps that still limit profile completeness and report-detail completeness.

## Task List

## `T15` Refresh Snapshot Delta Audit (Completed)
- Goal: re-baseline the active drift plan against the latest copied `src/lib/api/*` snapshot.
- Deliverables:
  - the active plan now reflects the latest snapshot capabilities
  - auth recovery, periodic export, and public/admin profile reads are recorded as available
  - stale claims about missing public/admin read contracts are removed
- Write Scope:
  - `.agents/context/codebase-drift-active.md`
  - `.agents/context/codebase-drift-archive.md`
- Dependencies:
  - None
- Parallel Notes:
  - Must be kept current whenever `src/lib/api/*` is refreshed again

## `T16` Auth Recovery Adoption (Completed)
- Goal: consume the refreshed auth recovery routes without disturbing the existing login/register flow.
- Deliverables:
  - forgot-password now submits through `client.forgotPassword(...)`
  - reset-password now submits through `client.resetPassword(...)`
  - login/register and auth-session behavior remain unchanged
- Write Scope:
  - `src/rpc/auth.ts`
  - `src/rpc/index.ts`
  - `src/app/auth/lupa-kata-sandi/page.tsx`
  - `src/app/auth/reset-password/[token]/page.tsx`
  - `src/components/auth/forgot-password-form.tsx`
  - `src/components/auth/reset-password-form.tsx`
- Dependencies:
  - `T15`
- Parallel Notes:
  - Safe to rerun independently from report/profile work

## `T17` Report Pagination and Periodic Export Adoption (Completed)
- Goal: align report/periodic flows with the latest snapshot, especially paginated list envelopes and the dedicated export helper.
- Deliverables:
  - report RPC now consumes server pagination/meta for both `PUBLIC` and `SCHOOL`
  - current `page`/`limit` RPC surface is preserved
  - periodic report export now uses `createSppgReportExportHelper(...)` through a server route boundary
  - periodic download buttons now trigger real exports
  - synthetic periodic `url` fields are removed from frontend domain state
- Write Scope:
  - `src/rpc/reports.ts`
  - `src/app/dashboard/sppg/laporan-periodik/export/route.ts`
  - `src/containers/sppg-periodic-reports-container.tsx`
  - `src/components/dashboard/sppg/periodic-report-table.tsx`
  - `src/types/ui.ts`
  - `src/types/mappers.ts`
  - `src/mock-data/index.ts`
- Dependencies:
  - `T15`
- Parallel Notes:
  - Owns the periodic-report domain change to avoid mapper/type conflicts

## `T18` Profile Contract Re-Baseline (Completed)
- Goal: sync the plan to the new public/admin profile read routes and use that contract truth to complete the profile slice where feasible.
- Deliverables:
  - `getPublicProfile` and `getAdminProfile` are now recorded as available
  - explicit mapping defaults were applied for the existing frontend domain shapes
  - the remaining profile gaps are now only true backend/data gaps, not stale plan assumptions
- Write Scope:
  - `.agents/context/codebase-drift-active.md`
  - `.agents/context/codebase-drift-archive.md`
- Dependencies:
  - `T15`
- Parallel Notes:
  - Planning/contract task only in this pass

## `T11` Profile Foundation (Completed)
- Goal: adopt real public/admin profile reads while preserving the current profile page contract and session-driven semantics.
- Deliverables:
  - `PUBLIC` current-profile read now uses `getPublicProfile` with `displayName := username`
  - `ADMIN` current-profile read now uses `getAdminProfile` with `name := dto.name ?? dto.username`
  - `ADMIN.accessDetails` remains explicit frontend placeholder metadata until the backend exposes richer permission data
  - keep `SCHOOL` on the existing contract-backed read/write path
  - keep `fetchCurrentProfile()` free of caller-supplied role selection
- Write Scope:
  - `src/rpc/profile.ts`
  - `src/hooks/use-current-profile.ts`
  - `src/containers/profile-container.tsx`
  - admin/public profile UI as needed
- Dependencies:
  - `T18`
- Parallel Notes:
  - Foundation is now landed and consumed by `T12` and `T13`

## `T12` SPPG Dashboard Profile Tail (Completed)
- Goal: finalize the `/dashboard/sppg/profil` slice on top of the corrected shared profile foundation.
- Deliverables:
  - `updateSppgProfile` is now wired for `sppg_name` and `sppg_address`
  - the page copy now explicitly marks email, username, password, and registration code as read-only account data
- Write Scope:
  - SPPG profile container/components
- Dependencies:
  - `T11`
- Parallel Notes:
  - Completed on top of the shared profile foundation

## `T13` Admin Dashboard Profile Tail (Completed)
- Goal: finalize the `/dashboard/admin/profil` slice on top of the corrected shared profile foundation.
- Deliverables:
  - `getAdminProfile` is now adopted behind the shared profile foundation
  - `updateProfile` is now wired for name, email, username, and password
  - `accessDetails` placeholder behavior remains explicit until backend support exists
- Write Scope:
  - admin profile container/components
- Dependencies:
  - `T11`
- Parallel Notes:
  - Completed on top of the shared profile foundation

## `T10` Cleanup, Verification, and Closeout (In Progress)
- Goal: finish the current refresh pass and leave only genuine backend/data gaps plus unrelated workspace blockers.
- Deliverables:
  - `pnpm lint` is green
  - `pnpm build` is rerun and its unrelated workspace blocker is recorded accurately
  - `gitnexus_detect_changes(scope: "all")` is rerun and its widened scope is explained accurately
  - this file remains synced to the latest `src/lib/api/*` snapshot and the implemented auth/report/profile work
- Write Scope:
  - touched non-profile source files
  - `.agents/context/codebase-drift-active.md`
  - `.agents/context/codebase-drift-archive.md`
- Dependencies:
  - `T16`
  - `T17`
  - `T18`
- Parallel Notes:
  - final verification only
  - if `pnpm build` still fails on the unrelated `lucide-react` blocker, record it explicitly instead of attributing it to API integration

## Verification Baseline

- `pnpm lint`
- `pnpm build`

Current expectation:
- `pnpm lint` is currently green
- `pnpm build` is currently blocked by the unrelated landing-page `lucide-react` dependency issue until that workspace problem is resolved separately
- `gitnexus_detect_changes(scope: "all")` is currently `critical` because this dirty workspace includes the refreshed shared client snapshot, not because the implementation unexpectedly widened beyond auth/report/profile/periodic adoption
