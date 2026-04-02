---
name: pagar-api-client-usage
description: Use when working in a frontend codebase that copied the PAGAR API client files from `client/`, and you need to consume the API through that copied client surface, including auth injection, DTO compatibility exports, multipart requests, and error-handling expectations.
---

# PAGAR API Client Usage

Use this skill when wiring frontend code to the backend through the copied PAGAR client files.

Assumption:

- the consuming frontend copied `client/index.ts`, `client/api-client.ts`, `client/api-contract.ts`, and `client/dto.ts` into its own local `client/` directory
- frontend code should use that copied entrypoint, not reimplement the transport layer from scratch

## Use The Single Entry Point

Import from the copied `client/index.ts`, not from deep internal files, unless you are editing the copied client itself.

```ts
import { ApiClientError, createApiClient, dto } from '../client';
```

Default rule:

- use `createApiClient()` for real backend calls
- use `dto` only for compatibility or schema validation needs
- use `apiContract` only when route metadata is the actual need

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

Typical frontend pattern:

- create the client once near the API boundary
- read `baseUrl` from frontend env config
- inject auth through `getAuthToken()`
- reuse the configured client instead of scattering raw `fetch` calls across components

## Lifecycle Hooks

Use `hooks` when the frontend needs request instrumentation or centralized logging.

```ts
const client = createApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  getAuthToken: () => localStorage.getItem('token'),
  hooks: {
    onRequest(context) {
      context.headers['x-trace-id'] = crypto.randomUUID();
    },
    onResponse(context) {
      console.debug(context.endpoint, context.response.status, context.payload);
    },
    onError(context) {
      console.error('api request failed', context.endpoint, context.error);
    },
  },
});
```

Exported hook types:

- `ApiClientHooks`
- `ApiClientRequestHookContext`
- `ApiClientResponseHookContext`
- `ApiClientErrorHookContext`

`onRequest(context)` receives:

- `endpoint`
- `contract`
- `request`
- `parsed`
- `url`
- `headers`
- `init`

`onResponse(context)` receives all `onRequest` fields plus:

- `response`
- `payload`

`onError(context)` receives all `onRequest` fields plus:

- `error`
- optional `response`
- optional `payload`

Use them like this:

- `onRequest` for headers, trace IDs, or request instrumentation
- `onResponse` for logs and metrics
- `onError` for centralized transport or HTTP failure reporting

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
    meal_time: '07.00',
    total_portion: 50,
    energy: 450,
    protein: 12,
    fat: 8,
    carbohydrate: 70,
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
- keep upload transport details inside the copied client instead of hand-building multipart requests in each component

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

