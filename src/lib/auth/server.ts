import "server-only";

import { cookies } from "next/headers";
import { isProduction } from "@/lib/env/server";
import type { TAuthSession, TRole } from "@/types";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_MAX_AGE_SECONDS,
  parseAuthSessionCookieValue,
  serializeAuthSessionCookie,
} from "./cookie";

const ALL_ROLES = ["ADMIN", "PUBLIC", "SCHOOL", "SPPG"] as const;

type SessionForRole<Role extends TRole> = TAuthSession & {
  user: TAuthSession["user"] & {
    role: Role;
  };
};

function getSessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: isProduction,
  };
}

export async function getAuthSession(): Promise<TAuthSession | null> {
  const cookieStore = await cookies();

  return parseAuthSessionCookieValue(
    cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );
}

export async function requireAuthSession(
  message = "Sesi tidak ditemukan.",
): Promise<TAuthSession> {
  const session = await getAuthSession();

  if (!session) {
    throw new Error(message);
  }

  return session;
}

export async function getAuthToken(): Promise<string | null> {
  return (await getAuthSession())?.token ?? null;
}

export async function getCurrentRole(): Promise<TRole | null> {
  return (await getAuthSession())?.user.role ?? null;
}

export async function requireCurrentRole<
  const Roles extends readonly TRole[] = typeof ALL_ROLES,
>(
  allowedRoles: Roles = ALL_ROLES as unknown as Roles,
  message = "Role sesi tidak diizinkan.",
): Promise<SessionForRole<Roles[number]>> {
  const session = await requireAuthSession(message);

  if (!allowedRoles.includes(session.user.role as Roles[number])) {
    throw new Error(message);
  }

  return session as SessionForRole<Roles[number]>;
}

export async function setAuthSession(session: TAuthSession) {
  const cookieStore = await cookies();

  cookieStore.set(
    AUTH_SESSION_COOKIE_NAME,
    serializeAuthSessionCookie(session),
    getSessionCookieOptions(AUTH_SESSION_MAX_AGE_SECONDS),
  );
}

export async function clearAuthSession() {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_SESSION_COOKIE_NAME, "", getSessionCookieOptions(0));
}
