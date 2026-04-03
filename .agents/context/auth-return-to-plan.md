# Auth ReturnTo Redirect Plan

Status: completed

## Goal

Replace the current auth redirect-reason pattern with a `returnTo` flow:
- unauthenticated protected-route requests redirect to `/auth/masuk?returnTo=...`
- the login page shows a generic inline notice when `returnTo` is present and valid
- successful login redirects to validated `returnTo`
- invalid `returnTo` values fall back to the existing role-based landing page

## Dependency Summary

```text
T01 ──> T02 ──> T04 ──> T05
  └──> T03 ────────┘
```

## Tasks

### T01 Redirect Contract

Status: completed

- Define one shared `returnTo` query param name.
- Add a helper to normalize and validate candidate redirect paths.
- Reject absolute URLs, protocol-prefixed URLs, malformed values, and auth-loop targets.

Write scope:
- `src/lib/auth/*`

### T02 Protected Redirect Propagation

Status: completed

- Update the proxy so unauthenticated access to protected routes redirects to login with `returnTo`.
- Preserve the original pathname and query string in `returnTo`.

Write scope:
- `src/proxy.ts`

Dependencies:
- `T01`

### T03 Login Notice UX

Status: completed

- Read `returnTo` on the login page server-side.
- Show a generic inline notice above the login form when `returnTo` is valid.

Write scope:
- `src/app/auth/masuk/page.tsx`
- `src/components/auth/login-form.tsx`

Dependencies:
- `T01`

### T04 Safe Post-Login Redirect

Status: completed

- Use validated `returnTo` after successful login.
- Fall back to the existing role-based landing path when `returnTo` is missing or rejected.
- Keep redirect validation centralized in one helper.

Write scope:
- `src/lib/auth/actions.ts`
- `src/components/auth/login-form.tsx`

Dependencies:
- `T01`
- `T02`
- `T03`

### T05 Verification And Cleanup

Status: completed

- Remove the old redirect-reason implementation.
- Run `pnpm format`.
- Run `pnpm lint` on touched files.
- Run `pnpm build`.
- Run GitNexus `detect_changes()` to confirm expected scope.

Dependencies:
- `T04`

## Handoff Notes

- Keep `returnTo` parsing on the server page instead of `useSearchParams()` in the client form.
- Treat repeated `returnTo` query params as invalid and fall back to default login behavior.
- Prefer server-side redirect decision in `loginAction()` so redirect safety stays in the auth layer.
- Ignore unrelated workspace changes, especially existing `AGENTS.md` edits.
- Verification passed with `pnpm format`, `pnpm lint`, and `pnpm build`.
- GitNexus `detect_changes()` reported elevated risk because auth and action-file symbols are involved, but the intended redirect/login path changes are present and expected.
