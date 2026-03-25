import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardAppLogo } from "../dashboard/dashboard-app-logo";
import { DashboardSidebarNav } from "./dashboard-sidebar-nav";
import { DashboardSidebarProfile } from "./dashboard-sidebar-profile";

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0" collapsible="icon">
      <SidebarHeader className="flex h-20 justify-center border-0 p-4 group-data-[collapsible=icon]:p-2">
        <DashboardAppLogo />
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
