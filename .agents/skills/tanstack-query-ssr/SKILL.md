---
name: tanstack-query-ssr
description: Guide for implementing SSR (Server-Side Rendering) with TanStack Query in Next.js App Router. Use this skill whenever the user asks about data fetching with TanStack React Query in Next.js server components, dehydrating state, hydration boundaries, prefetching queries, or organizing query providers for SSR. This is crucial to avoid hydration mismatches, memory leaks, and multiple refetches.
---

# TanStack Query SSR in Next.js App Router

A guide to implementing SSR with TanStack Query in Next.js App Router using `prefetchQuery` and `HydrationBoundary`. This approach allows you to fetch data on the server, serialize it, and seamlessly hydrate it on the client, eliminating loading states and preventing refetches.

## Core Concepts

- **Server-Side Data Fetching**: Prefetching data on the server directly inside React Server Components (`app/page.tsx`, etc.).
- **Dehydration and Hydration**: Passing the pre-fetched state from the server to client components using `HydrationBoundary` and `dehydrate`.
- **Cache Management**: Managing server and client query times (`staleTime` and `gcTime`) effectively to prevent memory leaks and hydration mismatches.

## Implementation Workflow

### 1. Create the Query Provider

Set up a client-side provider with `staleTime` to prevent immediate refetches. By default, queries should have a `staleTime` that avoids repeating fetches right after rendering.

```tsx
// components/providers/query-provider.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  staleTime: 5 * 60 * 1000, // 5 minutes
               },
            },
         }),
   );

   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   );
}
```

### 2. Wrap the Application

Integrate the provider in your root layout so the entire app can access the query client context.

```tsx
// app/layout.tsx
import { QueryProvider } from '@/components/providers/query-provider';

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body>
            <QueryProvider>{children}</QueryProvider>
         </body>
      </html>
   );
}
```

### 3. Prefetch and Hydrate Data

In a server component, initialize a temporary query client. Use `prefetchQuery` to fetch the data and then wrap the nested components in a `HydrationBoundary` with the dehydrated state.

**CRITICAL**: Set `gcTime` on the server's QueryClient to something small so you don't leak memory, but not zero.

```tsx
// app/page.tsx
import {
   dehydrate,
   HydrationBoundary,
   QueryClient,
} from '@tanstack/react-query';
import { getServerData } from '@/rpc/api';
import { MyComponent } from '@/components/my-component';

export default async function HomePage() {
   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            // 2 seconds to prevent memory leaks on server, but allow time for dehydration
            gcTime: 2 * 1000,
         },
      },
   });

   // Prefetch data
   await queryClient.prefetchQuery({
      queryKey: ['data'],
      queryFn: getServerData,
   });

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <MyComponent />
      </HydrationBoundary>
   );
}
```

### 4. Use the Data on the Client

Use the `useQuery` hook with the exact same key. The data will be instantly available and hydrated; it will not fetch again over the network until `staleTime` expires.

```tsx
// components/my-component.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { getServerData } from '@/rpc/api';

export function MyComponent() {
   const { data } = useQuery({
      queryKey: ['data'],
      queryFn: getServerData,
   });

   return <div>{data?.message}</div>;
}
```

## Critical Best Practices

1. **`staleTime` Settings**: Always set a `staleTime` (e.g., 5-60 seconds or more depending on need) on the server/client properly to prevent hydration mismatches and redundant client fetches.
2. **Server `gcTime`**: Set `gcTime` on the server to a short duration (e.g., `2 * 1000` ms) to prevent memory leaks. Avoid `gcTime: 0` as it can cause hydration errors by garbage collecting data before rendering is complete.
3. **Mix Prefetched and Client-Only Queries**: It is perfectly fine to have some queries prefetch on the server and others fetch only on the client. Just leave the server prefetch out, and do only `useQuery` on the client.
4. **Memory Management**: For high-traffic servers, consider calling `queryClient.clear()` after `dehydrate()` to free memory immediately.
