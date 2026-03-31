import "server-only";

import { cookies } from "next/headers";
import { createApiClient } from "@/lib/api";
import {
  AUTH_SESSION_COOKIE_NAME,
  parseAuthSessionCookieValue,
} from "@/lib/auth/cookie";
import { env } from "@/lib/env/server";

async function getSessionToken() {
  const cookieStore = await cookies();
  const session = parseAuthSessionCookieValue(
    cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );

  return session?.token ?? null;
}

let serverApiClient: ReturnType<typeof createApiClient> | null = null;

export function createServerApiClient() {
  serverApiClient ??= createApiClient({
    baseUrl: env.PAGAR_API_BASE_URL,
    getAuthToken: getSessionToken,
  });

  return serverApiClient;
}
