import { DashboardMobileHeader } from "@/components/layout/dashboard-mobile-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthSession } from "@/lib/auth/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar session={session} />
        <SidebarInset className="bg-transparent peer-data-[variant=inset]:min-h-svh">
          <DashboardMobileHeader session={session} />
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 md:py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
