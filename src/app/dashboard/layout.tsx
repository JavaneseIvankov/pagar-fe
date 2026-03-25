import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="overflow-y-auto peer-data-[variant=inset]:min-h-svh">
          <main className="mx-auto w-full flex-1 p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
