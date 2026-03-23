import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardSidebarNav } from "./dashboard-sidebar-nav";
import { DashboardSidebarProfile } from "./dashboard-sidebar-profile";

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0" collapsible="icon">
      <SidebarHeader className="flex h-20 justify-center border-0 p-4 group-data-[collapsible=icon]:p-2">
        <Link
          href="/dashboard/sppg"
          className="flex items-center justify-center"
        >
          <AppLogo className="relative h-16 w-8/12 overflow-hidden transition-all group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <DashboardSidebarNav />
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
        <DashboardSidebarProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
