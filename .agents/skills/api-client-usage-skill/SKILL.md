---
name: pagar-api-client-usage
description: Use when working in the frontend of this repo and you need to consume the PAGAR API through the shared client in `client/`, including auth injection, DTO compatibility exports, multipart requests, and error-handling expectations.
---

# PAGAR API Client Usage

Use this skill when wiring frontend code to the backend through the shared client in this repo.

## Use The Single Entry Point

Import from `client/index.ts`, not from deep internal files, unless you are editing the client itself.

```ts
import { ApiClientError, createApiClient, dto } from '../client';
```

Default rule:

- use `createApiClient()` for real backend calls
- use `dto` only for compatibility or schema validation needs

## Create The Client

```ts
const client = createApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  getAuthToken: () => localStorage.getItem('token'),
});
```

Important behavior:

- `baseUrl` must be non-empty
- trailing slashes are stripped automatically
- bare tokens are prefixed with `Bearer `
- explicit request `Authorization` headers override `getAuthToken()`

## Preferred Call Pattern

Use named endpoint methods, not `client.request(...)`, unless you have a specific generic abstraction.

```ts
await client.login({
  body: {
    username: 'admin_malang',
    password: 'password123',
  },
});

await client.getPendingAccounts({
  query: {
    page: 1,
    limit: 10,
  },
});
```

## Params And Multipart

Path params:

```ts
await client.updateAccountStatus({
  params: {
    id_user: selectedUserId,
  },
  body: {
    status: 'APPROVED',
  },
});
```

Multipart:

```ts
await client.createSppgDailyReport({
  body: {
    date_report: '2026-03-30',
    menu_name: 'Nasi Uduk',
    total_portion: 50,
    budgets: [
      { item_name: 'Beras', item_price: 120000 },
      { item_name: 'Telur', item_price: 80000 },
    ],
  },
  files: {
    attachments: selectedFiles,
  },
});
```

Multipart rules:

- `files` values must be `Blob`/`File`
- body objects are serialized for you
- do not set multipart `content-type` manually

## Error Model

Server-side HTTP failures are thrown as `ApiClientError`.

```ts
try {
  await client.getPendingAccounts({
    query: { page: 1, limit: 10 },
  });
} catch (error) {
  if (error instanceof ApiClientError) {
    console.error(error.status, error.endpoint, error.data);
  }
}
```

Important distinction:

- invalid request input may fail before transport as `ZodError`
- real HTTP failures come back as `ApiClientError`

Example:

- missing auth for protected endpoints can fail client-side because the request does not satisfy the declared `authorization` header schema
- invalid bearer tokens pass client validation and fail on the server as `ApiClientError`

## DTO Compatibility

DTO exports are intentionally available for backward compatibility with frontend code that already validates mock payloads.

```ts
const parsed = dto.loginSuccessResponseSchema.parse(payload);
```

Use DTOs for:

- compatibility with existing mock-based consumers
- local schema validation
- incremental migration

Do not use DTOs as a substitute for the real client transport layer in new code.

## Contract Access

`apiContract` is available when route metadata is genuinely needed:

```ts
import { apiContract } from '../client';

const url = apiContract.getPendingAccounts.buildPath();
```

Prefer the client methods unless route metadata is the actual goal.

## Validation Commands

Use these when changing the frontend client surface:

```bash
npm run typecheck:client
npm run test:client
npm run test:e2e
npm run test:contract
```
