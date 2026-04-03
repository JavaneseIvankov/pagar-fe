import "server-only";

import { createApiClient } from "@/lib/api";
import { getAuthToken } from "@/lib/auth/server";
import { env } from "@/lib/env/server";

const DEBUG = env.NODE_ENV === "development";

let serverApiClient: ReturnType<typeof createApiClient> | null = null;

export function createServerApiClient() {
  serverApiClient ??= createApiClient({
    baseUrl: env.PAGAR_API_BASE_URL,
    getAuthToken,
    hooks: {
      onRequest(context) {
        console.log(
          `[API] → ${context.endpoint.toUpperCase()} ${context.init.method} ${context.url}`,
        );

        if (DEBUG) {
          console.log("[API:DEBUG] Request context:");
          console.dir(
            {
              endpoint: context.endpoint,
              method: context.init.method,
              url: context.url,
              headers: context.headers,
              body: context.init.body,
              query: context.parsed.query,
              params: context.parsed.params,
            },
            { depth: 4, colors: true },
          );
        }
      },
      onResponse(context) {
        console.log(
          `[API] ← ${context.endpoint} ${context.response.status} ${context.response.ok ? "✓" : "✗"}`,
        );

        if (DEBUG) {
          console.log("[API:DEBUG] Response context:");
          console.dir(
            {
              endpoint: context.endpoint,
              status: context.response.status,
              contentType: context.response.headers.get("content-type"),
              payload: context.payload,
            },
            { depth: 4, colors: true },
          );
        }
      },
      onError(context) {
        if (context.error instanceof Error) {
          console.error(
            `[API] ✗ ${context.endpoint} Error: ${context.error.message}`,
          );
        } else {
          console.error(`[API] ✗ ${context.endpoint} Error:`, context.error);
        }

        if (DEBUG) {
          console.log("[API:DEBUG] Error context:");
          console.dir(
            {
              endpoint: context.endpoint,
              error: context.error,
              response: context.response
                ? {
                    status: context.response.status,
                    statusText: context.response.ok ? "OK" : "Error",
                  }
                : "No response",
              payload: context.payload,
            },
            { depth: 4, colors: true },
          );
        }
      },
    },
  });

  return serverApiClient;
}
