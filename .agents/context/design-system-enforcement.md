# Tokenization Cleanup Plan

Replace non-token colors/typography and Button overrides across app + landing using existing tokens only, with parallel-safe slices by area.

## Summary
- Colors: map palette/hex/gradients to semantic tokens (`primary`, `secondary`, `accent`, `muted`, `destructive`, `foreground`, `background`) and tokenized opacity (`/10`, `/20`).
- Typography: replace arbitrary sizes with token-based sizes (prefer CSS vars in `globals.css`, fall back to Tailwind scale only when a token equivalent doesn’t exist).
- Buttons: replace custom background/text class overrides with `variant` + `size` and minimal layout-only className.
- Preflight: each task runs `gitnexus_impact` on any symbol it edits before changing it.

## Dependency Summary
```
T01 ─┬─> T02 ─┐
     ├─> T03 ─┼─> T07
     ├─> T04 ─┤
     └─> T05 ─┘
```

## Recommended Execution Batches
### Batch 1
- `T01` Shared token mapping + primitives

### Batch 2
- `T02` Profile/Admin forms + profile cards
- `T03` SPPG report detail + reports components
- `T04` Dashboard components + containers
- `T05` Landing/public pages + auth daftar cards

### Batch 3
- `T07` Integration, verification, and final scan

## Task List

## `T01` Shared Token Mapping + Primitives
- Goal: Establish consistent mapping rules and remove non-token typography inside shared primitives/mappers.
- Deliverables: Replace `text-[0.8rem]` in Button `sm` with token-based size; convert `account-role`, `periodic-report-status`, `admin-complaint-status` to semantic token classes (e.g., success → `bg-primary/10 text-primary`, danger → `bg-destructive/10 text-destructive`, info → `bg-secondary/10 text-secondary-foreground`, warning → `bg-accent/10 text-accent-foreground`, neutral → `bg-muted text-muted-foreground`).
- Write Scope: `src/components/ui/button.tsx`, `src/lib/ui-mappers/account-role.ts`, `src/lib/ui-mappers/periodic-report-status.ts`, `src/lib/ui-mappers/admin-complaint-status.ts`.
- Dependencies: None.
- Parallel Notes: Must land before other tasks to keep mappings consistent.

## `T02` Profile/Admin Forms + Profile Cards
- Goal: Remove palette/hex colors and Button overrides in profile-related components.
- Deliverables: Replace green `Button` overrides with `variant="default"` and `size` props; replace profile card hex backgrounds with semantic tokens; standardize micro typography to token sizes.
- Write Scope: `src/components/profile/public-profile-form.tsx`, `src/components/profile/school-profile-form.tsx`, `src/components/profile/sppg-professional-info-card.tsx`, `src/components/profile/admin-account-settings-card.tsx`, `src/components/profile/admin-access-details-card.tsx`, `src/components/profile/sppg-account-settings-card.tsx`, `src/components/profile/profile-header-card.tsx`.
- Dependencies: `T01`.
- Parallel Notes: Safe to run in parallel with T03–T05.

## `T03` SPPG Report Detail + Reports Components
- Goal: Replace hardcoded colors/gradients and micro typography in report detail and report list widgets.
- Deliverables: Tokenize gradients using `bg-gradient-to-*` + semantic colors; replace hex fills with semantic tokens; map `text-[9–11px]` to token body sizes; replace `tracking-[0.2em]` with a token utility (`tracking-widest`).
- Write Scope: `src/components/sppg-report-detail/*`, `src/components/reports/*`.
- Dependencies: `T01`.
- Parallel Notes: Safe to run in parallel with T02, T04, T05.

## `T04` Dashboard Components + Containers
- Goal: Replace palette utilities and Button overrides in dashboards and summary widgets.
- Deliverables: Convert palette badges/icons to semantic tokens; replace any custom button skins with `variant` usage; map neutral placeholders (`bg-slate-*`) to `bg-muted` or `bg-border`.
- Write Scope: `src/containers/admin-dashboard-container.tsx`, `src/containers/sppg-dashboard-container.tsx`, `src/containers/admin-profile-container.tsx`, `src/components/dashboard/*`, `src/components/admin/kelola-akun/validasi-akun-card.tsx`, `src/components/ui/multi-segment-progress.tsx`.
- Dependencies: `T01`.
- Parallel Notes: Safe to run in parallel with T02, T03, T05.

## `T05` Landing/Public Pages + Auth Daftar Cards
- Goal: Replace palette/hex usage and gradients in landing and public-facing pages with semantic tokens.
- Deliverables: Tokenize backgrounds and text colors; replace gradients with `bg-gradient-to-*` using semantic colors; align CTA buttons to `Button` variants.
- Write Scope: `src/components/landing/*`, `src/app/auth/daftar/page.tsx`.
- Dependencies: `T01`.
- Parallel Notes: Safe to run in parallel with T02–T04.

## `T07` Integration + Verification
- Goal: Ensure all targeted non-token patterns are removed and UI remains consistent.
- Deliverables: Re-run `rg` checks for `text-[`, `bg-<palette>`, and hex/rgb usage; run `pnpm format`, `pnpm lint`, `pnpm build`; manual spot-check key pages (Landing, Dashboard, Profile forms, Report detail).
- Write Scope: repo-wide.
- Dependencies: `T02`, `T03`, `T04`, `T05`.
- Parallel Notes: Final integration only.

## Assumptions
- Strict token enforcement applies to all areas, including landing/marketing pages.
- Existing tokens only; no new color tokens will be introduced.
- Icon-only colors may remain if they are purely illustrative and not used as surfaces.
- Each task will run `gitnexus_impact` before editing any symbol it touches.
