import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#f8f9fa]">
        <DashboardSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#f8f9fa] peer-data-[variant=inset]:min-h-svh">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
