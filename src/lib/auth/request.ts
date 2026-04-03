import type { NextRequest } from "next/server";
import type { TAuthSession, TRole } from "@/types";
import {
  AUTH_SESSION_COOKIE_NAME,
  parseAuthSessionCookieValue,
} from "./cookie";

export function getAuthSessionFromRequest(
  request: NextRequest,
): TAuthSession | null {
  return parseAuthSessionCookieValue(
    request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );
}

export function getCurrentRoleFromRequest(request: NextRequest): null | TRole {
  return getAuthSessionFromRequest(request)?.user.role ?? null;
}
