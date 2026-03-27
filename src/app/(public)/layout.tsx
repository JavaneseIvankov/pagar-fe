import { cookies } from "next/headers";
import { AppHeader } from "@/components/app-header";
import {
  AUTH_SESSION_COOKIE_NAME,
  parseAuthSessionCookieValue,
} from "@/lib/auth";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const session = parseAuthSessionCookieValue(
    cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );

  return (
    <div className="flex min-h-[100dvh] w-full flex-col">
      <AppHeader session={session} />
      <section className="container flex-1 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
        {children}
      </section>
    </div>
  );
}
