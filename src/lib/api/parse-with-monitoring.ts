import * as Sentry from "@sentry/nextjs";
import { ZodError, type ZodTypeAny } from "zod/v3";
import { reportApiBoundaryFailure } from "./monitoring";

export function parseWithMonitoring<TSchema extends ZodTypeAny>(options: {
  schema: TSchema;
  payload: unknown;
  operation: string;
  publicMessage: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    return options.schema.parse(options.payload);
  } catch (error) {
    if (error instanceof ZodError) {
      const kind = options.operation.startsWith("rpc:")
        ? "rpc-parse"
        : "api-response-parse";

      Sentry.captureException(error, {
        level: "error",
        tags: {
          boundary: "api",
          kind,
          operation: options.operation,
        },
        extra: {
          publicMessage: options.publicMessage,
          payload: options.payload,
          metadata: options.metadata,
        },
      });

      reportApiBoundaryFailure({
        kind,
        operation: options.operation,
        publicMessage: options.publicMessage,
        error,
        payload: options.payload,
        metadata: options.metadata,
      });

      throw new Error(options.publicMessage);
    }

    throw error;
  }
}
