"use server";

import {
  loginUser,
  logoutUser,
  registerUser,
  type AuthActionResult,
} from "@/rpc/auth";

export async function loginAction(input: {
  password: string;
  returnTo?: string;
  username: string;
}): Promise<AuthActionResult> {
  return loginUser(input);
}

export async function registerAction(
  input: Parameters<typeof registerUser>[0],
): Promise<AuthActionResult> {
  return registerUser(input);
}

export async function logoutAction() {
  await logoutUser();
}
