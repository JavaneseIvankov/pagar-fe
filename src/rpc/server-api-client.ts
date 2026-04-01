import "server-only";

import { createApiClient } from "@/lib/api";
import { getAuthToken } from "@/lib/auth/server";
import { env } from "@/lib/env/server";

let serverApiClient: ReturnType<typeof createApiClient> | null = null;

export function createServerApiClient() {
  serverApiClient ??= createApiClient({
    baseUrl: env.PAGAR_API_BASE_URL,
    getAuthToken,
  });

  return serverApiClient;
}
