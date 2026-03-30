import { cookies } from "next/headers";
import { DashboardMobileHeader } from "@/components/layout/dashboard-mobile-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  AUTH_SESSION_COOKIE_NAME,
  parseAuthSessionCookieValue,
} from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = parseAuthSessionCookieValue(
    cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar session={session} />
        <SidebarInset className="overflow-y-auto bg-transparent peer-data-[variant=inset]:min-h-svh">
          <DashboardMobileHeader session={session} />
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 md:py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
