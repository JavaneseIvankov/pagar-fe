import "server-only";

import { QueryClient } from "@tanstack/react-query";

const SERVER_QUERY_GC_TIME_MS = 2_000;
const QUERY_STALE_TIME_MS = 30_000;

export function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: SERVER_QUERY_GC_TIME_MS,
        staleTime: QUERY_STALE_TIME_MS,
      },
    },
  });
}
