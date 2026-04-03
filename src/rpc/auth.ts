"use server";

import { ApiClientError } from "@/lib/api";
import { getAuthenticatedLandingPath } from "@/lib/auth/navigation";
import { getSafeReturnToPath } from "@/lib/auth/redirects";
import { clearAuthSession, setAuthSession } from "@/lib/auth/server";
import {
  mapLoginDtoToDomain,
  mapRegisterDtoToDomain,
  type TAuthRegistrationResult,
} from "@/types";
import { createServerRpc } from "./server-rpc";

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

type PasswordRecoveryErrorResult = {
  message: string;
  status: "error";
};

type PasswordRecoverySuccessResult = {
  message: string;
  redirectTo?: string;
  status: "success";
};

export type PasswordRecoveryActionResult =
  | PasswordRecoveryErrorResult
  | PasswordRecoverySuccessResult;

type LoginUserInput = {
  password: string;
  returnTo?: string;
  username: string;
};

type RequestPasswordResetInput = {
  email: string;
};

type ResetPasswordInput = {
  newPassword: string;
  token: string;
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

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

const registerWithBackend = createServerRpc(
  {
    operation: "registerWithBackend",
  },
  async (
    { client },
    input: RegisterUserInput,
  ): Promise<TAuthRegistrationResult> => {
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
  },
);

const loginWithBackend = createServerRpc(
  {
    operation: "loginWithBackend",
  },
  async ({ client }, input: LoginUserInput) => {
    return client.login({
      body: {
        password: input.password,
        username: input.username,
      },
    });
  },
);

const requestPasswordResetWithBackend = createServerRpc(
  {
    operation: "requestPasswordResetWithBackend",
  },
  async ({ client }, input: RequestPasswordResetInput) => {
    return client.forgotPassword({
      body: {
        email: input.email,
      },
    });
  },
);

const resetPasswordWithBackend = createServerRpc(
  {
    operation: "resetPasswordWithBackend",
  },
  async ({ client }, input: ResetPasswordInput) => {
    return client.resetPassword({
      params: {
        token: input.token,
      },
      body: {
        newPassword: input.newPassword,
      },
    });
  },
);

export async function loginUser(
  input: LoginUserInput,
): Promise<AuthActionResult> {
  try {
    const response = await loginWithBackend(input);
    const session = mapLoginDtoToDomain(response.data);
    const safeReturnTo = getSafeReturnToPath(input.returnTo);

    await setAuthSession(session);

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

export async function requestPasswordReset(
  input: RequestPasswordResetInput,
): Promise<PasswordRecoveryActionResult> {
  try {
    const result = await requestPasswordResetWithBackend(input);

    return {
      status: "success",
      message: result.message,
    };
  } catch (error) {
    return {
      status: "error",
      message: getErrorMessage(
        error,
        "Gagal memproses permintaan reset kata sandi.",
      ),
    };
  }
}

export async function resetPassword(
  input: ResetPasswordInput,
): Promise<PasswordRecoveryActionResult> {
  try {
    const result = await resetPasswordWithBackend(input);

    return {
      status: "success",
      message: result.message,
      redirectTo: "/auth/masuk",
    };
  } catch (error) {
    return {
      status: "error",
      message: getErrorMessage(error, "Gagal mengatur ulang kata sandi."),
    };
  }
}

export async function logoutUser() {
  await clearAuthSession();
}
