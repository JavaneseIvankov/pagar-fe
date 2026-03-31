"use server";

import { cookies } from "next/headers";
import { ApiClientError } from "@/lib/api";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_MAX_AGE_SECONDS,
  serializeAuthSessionCookie,
} from "@/lib/auth/cookie";
import { isProduction } from "@/lib/env/server";
import { getAuthenticatedLandingPath } from "@/lib/auth/navigation";
import { getSafeReturnToPath } from "@/lib/auth/redirects";
import {
  mapLoginDtoToDomain,
  mapRegisterDtoToDomain,
  type TAuthRegistrationResult,
} from "@/types";
import { createServerApiClient } from "./server-api-client";

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

type LoginUserInput = {
  password: string;
  returnTo?: string;
  username: string;
};

type RegisterPublicInput = {
  email: string;
  password: string;
  role: "PUBLIC";
  username: string;
};

type RegisterSchoolInput = {
  email: string;
  password: string;
  registrationCode?: string;
  role: "SCHOOL";
  schoolAddress: string;
  schoolName: string;
  username: string;
};

type RegisterSppgInput = {
  bgnCode?: string;
  email: string;
  password: string;
  role: "SPPG";
  sppgAddress: string;
  sppgName: string;
  username: string;
};

type RegisterUserInput =
  | RegisterPublicInput
  | RegisterSchoolInput
  | RegisterSppgInput;

function getSessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: isProduction,
  };
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

async function registerWithBackend(
  input: RegisterUserInput,
): Promise<TAuthRegistrationResult> {
  const client = createServerApiClient();

  if (input.role === "PUBLIC") {
    const response = await client.registerPublic({
      body: {
        email: input.email,
        password: input.password,
        username: input.username,
      },
    });

    return mapRegisterDtoToDomain(response);
  }

  if (input.role === "SCHOOL") {
    const response = await client.registerSchool({
      body: {
        email: input.email,
        password: input.password,
        registration_code: input.registrationCode,
        school_address: input.schoolAddress,
        school_name: input.schoolName,
        username: input.username,
      },
    });

    return mapRegisterDtoToDomain(response);
  }

  const response = await client.registerSppg({
    body: {
      bgn_code: input.bgnCode,
      email: input.email,
      password: input.password,
      sppg_address: input.sppgAddress,
      sppg_name: input.sppgName,
      username: input.username,
    },
  });

  return mapRegisterDtoToDomain(response);
}

export async function loginUser(
  input: LoginUserInput,
): Promise<AuthActionResult> {
  try {
    const client = createServerApiClient();
    const response = await client.login({
      body: {
        password: input.password,
        username: input.username,
      },
    });
    const session = mapLoginDtoToDomain(response.data);
    const cookieStore = await cookies();
    const safeReturnTo = getSafeReturnToPath(input.returnTo);

    cookieStore.set(
      AUTH_SESSION_COOKIE_NAME,
      serializeAuthSessionCookie(session),
      getSessionCookieOptions(AUTH_SESSION_MAX_AGE_SECONDS),
    );

    return {
      status: "success",
      message: response.message,
      redirectTo:
        safeReturnTo ?? getAuthenticatedLandingPath(session.user.role),
    };
  } catch (error) {
    return {
      status: "error",
      message: getErrorMessage(error, "Gagal masuk ke akun Anda."),
    };
  }
}

export async function registerUser(
  input: RegisterUserInput,
): Promise<AuthActionResult> {
  try {
    const result = await registerWithBackend(input);

    return {
      status: "success",
      message: result.message,
      redirectTo: "/auth/masuk",
    };
  } catch (error) {
    return {
      status: "error",
      message: getErrorMessage(error, "Gagal mendaftarkan akun."),
    };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_SESSION_COOKIE_NAME, "", getSessionCookieOptions(0));
}
