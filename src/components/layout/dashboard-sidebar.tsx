"use client";

import { Logout01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logoutAction } from "@/lib/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import type { TAuthSession, TRole } from "@/types";
import { DashboardAppLogo } from "../dashboard/dashboard-app-logo";
import { DashboardSidebarNav } from "./dashboard-sidebar-nav";

function getRoleLabel(role: TRole) {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "PUBLIC":
      return "Publik";
    case "SCHOOL":
      return "Sekolah";
    case "SPPG":
      return "SPPG";
  }
}

export function DashboardSidebar({
  session,
}: {
  session: TAuthSession | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.replace("/auth/login");
      router.refresh();
    });
  };

  return (
    <Sidebar className="border-r-0" collapsible="icon">
      <SidebarHeader className="flex h-20 justify-center border-0 p-4 group-data-[collapsible=icon]:p-2">
        <DashboardAppLogo />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <DashboardSidebarNav />
      </SidebarContent>

      <SidebarFooter className="gap-3 border-0 p-4 group-data-[collapsible=icon]:p-2">
        {session ? (
          <div className="rounded-lg bg-muted/40 p-3 group-data-[collapsible=icon]:hidden">
            <p className="truncate font-semibold text-sm">
              {session.user.username}
            </p>
            <p className="text-muted-foreground text-xs">
              {getRoleLabel(session.user.role)}
            </p>
          </div>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          className="justify-start gap-3 rounded-lg px-3 font-bold text-destructive hover:bg-destructive/10 hover:text-destructive"
          disabled={isPending}
          onClick={handleLogout}
        >
          <HugeiconsIcon icon={Logout01Icon} size={18} />
          <span className="group-data-[collapsible=icon]:hidden">
            {isPending ? "Keluar..." : "Keluar"}
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
