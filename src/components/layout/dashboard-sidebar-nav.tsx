"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { DashboardIcon, ForkAndSpoonIcon, ReportIcon } from "../exported-icons";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/sppg",
    icon: DashboardIcon,
  },
  {
    title: "Manajemen Laporan",
    href: "/dashboard/sppg/manajemen-laporan",
    icon: ForkAndSpoonIcon,
  },
  {
    title: "Laporan Periodik",
    href: "/dashboard/sppg/laporan-periodik",
    icon: ReportIcon,
  },
];

export function DashboardSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                size="lg"
                isActive={isActive}
                tooltip={item.title}
                className="h-11 rounded-lg px-4 font-bold transition-colors hover:bg-muted/50 data-[active=true]:bg-transparent data-[active=true]:font-black data-[active=true]:text-primary"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon />
                  <span
                    className={cn("group-data-[collapsible=icon]:opacity-0")}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
