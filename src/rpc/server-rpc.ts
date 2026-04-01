import "server-only";

import { redirect } from "next/navigation";
import type { z } from "zod/v3";
import {
  API_RESPONSE_INVALID_MESSAGE,
  type ApiClient,
  ApiClientError,
  parseWithMonitoring,
} from "@/lib/api";
import { AUTH_SESSION_EXPIRED_PATH } from "@/lib/auth/redirects";
import { createServerApiClient } from "./server-api-client";

type ParseMetadata = Record<string, unknown>;

export interface ServerRpcContext {
  client: ApiClient;
  parse<TSchema extends z.ZodTypeAny>(
    schema: TSchema,
    payload: unknown,
    step: string,
    publicMessage?: string,
    metadata?: ParseMetadata,
  ): z.output<TSchema>;
}

export interface CreateServerRpcOptions {
  onAuthExpired?: "redirect" | "throw";
  operation: string;
  redirectTo?: string;
}

export function createServerRpc<TArgs extends unknown[], TResult>(
  options: CreateServerRpcOptions,
  handler: (context: ServerRpcContext, ...args: TArgs) => Promise<TResult>,
) {
  return async (...args: TArgs): Promise<TResult> => {
    const context: ServerRpcContext = {
      client: createServerApiClient(),
      parse(schema, payload, step, publicMessage, metadata) {
        return parseWithMonitoring({
          schema,
          payload,
          operation: `rpc:${options.operation}:${step}`,
          publicMessage: publicMessage ?? API_RESPONSE_INVALID_MESSAGE,
          metadata,
        });
      },
    };

    try {
      return await handler(context, ...args);
    } catch (error) {
      if (
        options.onAuthExpired === "redirect" &&
        error instanceof ApiClientError &&
        error.code === "auth_expired"
      ) {
        redirect(options.redirectTo ?? AUTH_SESSION_EXPIRED_PATH);
      }

      throw error;
    }
  };
}
