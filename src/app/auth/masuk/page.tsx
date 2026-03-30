import { AuthContentLayout } from "@/components/auth/auth-content-layout";
import { LoginForm } from "@/components/auth/login-form";
import {
  getSafeReturnToPath,
  LOGIN_RETURN_TO_PARAM,
} from "@/lib/auth/redirects";

interface LoginPageProps {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawReturnTo = resolvedSearchParams[LOGIN_RETURN_TO_PARAM];
  const safeReturnTo = Array.isArray(rawReturnTo)
    ? null
    : getSafeReturnToPath(rawReturnTo);

  return (
    <AuthContentLayout>
      <LoginForm
        returnTo={safeReturnTo}
        showAuthRequiredNotice={safeReturnTo !== null}
      />
    </AuthContentLayout>
  );
}
