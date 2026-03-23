import Link from "next/link";
import { AppLogo, AppLogoImage } from "@/components/app-logo";
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
    <Sidebar
      className="border-r-0 md:border-r border-border bg-white"
      collapsible="icon"
    >
      <SidebarHeader className="p-4 flex justify-center h-20 border-b group-data-[collapsible=icon]:p-2">
        <Link
          href="/dashboard/sppg"
          className="flex justify-start items-center"
        >
          <AppLogo className="w-24 h-8 relative group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 transition-all overflow-hidden" />
          {/* <AppLogoImage />
          </div> */}
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
