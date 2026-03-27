import { z } from "zod/v3";
import type { TAuthSession } from "@/types";

export const AUTH_SESSION_COOKIE_NAME = "pagar_auth_session";
export const AUTH_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const authSessionSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    role: z.enum(["ADMIN", "PUBLIC", "SCHOOL", "SPPG"]),
    username: z.string(),
  }),
});

export function parseAuthSessionCookieValue(rawValue?: string | null) {
  if (!rawValue) {
    return null;
  }

  try {
    const decodedValue = decodeURIComponent(rawValue);
    const session = authSessionSchema.parse(JSON.parse(decodedValue));

    return session satisfies TAuthSession;
  } catch {
    return null;
  }
}

export function serializeAuthSessionCookie(session: TAuthSession) {
  return encodeURIComponent(JSON.stringify(authSessionSchema.parse(session)));
}
