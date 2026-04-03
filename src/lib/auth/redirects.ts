export const LOGIN_RETURN_TO_PARAM = "returnTo";
export const AUTH_SESSION_EXPIRED_PATH = "/auth/session-expired";

const INTERNAL_APP_ORIGIN = "http://pagar.local";

export function buildReturnToPath(pathname: string, search = "") {
  return `${pathname}${search}`;
}

export function getSafeReturnToPath(returnTo?: null | string) {
  if (!returnTo) {
    return null;
  }

  const trimmedReturnTo = returnTo.trim();

  if (
    !trimmedReturnTo.startsWith("/") ||
    trimmedReturnTo.startsWith("//") ||
    trimmedReturnTo.startsWith("/auth")
  ) {
    return null;
  }

  try {
    const parsedUrl = new URL(trimmedReturnTo, INTERNAL_APP_ORIGIN);

    if (parsedUrl.origin !== INTERNAL_APP_ORIGIN) {
      return null;
    }

    if (parsedUrl.pathname.startsWith("/auth")) {
      return null;
    }

    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return null;
  }
}
