"use server";

import { cookies } from "next/headers";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_MAX_AGE_SECONDS,
  serializeAuthSessionCookie,
} from "@/lib/auth/cookie";
import { loginUser, registerUser } from "@/rpc/auth";
import type { TRole } from "@/types";
import { getAuthenticatedLandingPath } from "./navigation";

type AuthActionErrorResult = {
  message: string;
  status: "error";
};

type AuthActionSuccessResult = {
  message: string;
  redirectTo: string;
  status: "success";
};

export type AuthActionResult = AuthActionErrorResult | AuthActionSuccessResult;

function getSessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function loginAction(input: {
  password: string;
  username: string;
}): Promise<AuthActionResult> {
  try {
    const session = await loginUser(input);
    const cookieStore = await cookies();

    cookieStore.set(
      AUTH_SESSION_COOKIE_NAME,
      serializeAuthSessionCookie(session),
      getSessionCookieOptions(AUTH_SESSION_MAX_AGE_SECONDS),
    );

    return {
      status: "success",
      message: "Berhasil masuk ke akun Anda.",
      redirectTo: getAuthenticatedLandingPath(session.user.role),
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Gagal masuk ke akun Anda.",
    };
  }
}

export async function registerAction(input: {
  bgnCode?: string;
  password: string;
  registrationCode?: string;
  role: TRole;
  username: string;
}): Promise<AuthActionResult> {
  try {
    const result = await registerUser(input);

    return {
      status: "success",
      message: result.message,
      redirectTo: "/auth/login",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Gagal mendaftarkan akun.",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_SESSION_COOKIE_NAME, "", getSessionCookieOptions(0));
}
