"use client";

import { LOGIN_RETURN_TO_PARAM } from "@/lib/auth/redirects";
import { AUTH_SESSION_EXPIRED_MESSAGE } from "./error-messages";

let authExpiryRedirectInFlight = false;

export function isAuthSessionExpiredError(error: unknown) {
  return (
    error instanceof Error && error.message === AUTH_SESSION_EXPIRED_MESSAGE
  );
}

export function handleClientApiError(
  error: unknown,
  options?: {
    notify?: (message: string) => void;
    onAuthExpired?: () => void;
  },
) {
  if (!isAuthSessionExpiredError(error)) {
    return false;
  }

  if (authExpiryRedirectInFlight) {
    return true;
  }

  authExpiryRedirectInFlight = true;
  options?.notify?.(AUTH_SESSION_EXPIRED_MESSAGE);
  options?.onAuthExpired?.();

  const returnTo = `${window.location.pathname}${window.location.search}`;
  const loginUrl = new URL("/auth/masuk", window.location.origin);

  loginUrl.searchParams.set(LOGIN_RETURN_TO_PARAM, returnTo);
  window.location.assign(loginUrl.toString());

  return true;
}
