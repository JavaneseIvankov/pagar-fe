export type ApiBoundaryFailureEvent = {
  kind: "api-response-parse" | "rpc-parse";
  operation: string;
  publicMessage: string;
  error: unknown;
  payload?: unknown;
  metadata?: Record<string, unknown>;
};

export function reportApiBoundaryFailure(event: ApiBoundaryFailureEvent) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[api-boundary-failure]", event);
  }
}
