import { AppHeader } from "@/components/app-header";
import { getAuthSession } from "@/lib/auth/server";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getAuthSession();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col">
      <AppHeader session={session} />
      <section className="container flex-1 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
        {children}
      </section>
    </div>
  );
}
