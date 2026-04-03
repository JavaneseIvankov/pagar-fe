import "server-only";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v3";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PAGAR_API_BASE_URL: z.string().url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

export const isProduction = env.NODE_ENV === "production";
