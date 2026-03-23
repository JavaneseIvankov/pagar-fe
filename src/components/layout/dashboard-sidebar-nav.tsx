"use client";

import {
  DashboardSquare01Icon,
  File01Icon,
  Restaurant01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
                className="font-bold data-[active=true]:font-black data-[active=true]:text-primary px-4 rounded-lg data-[active=true]:bg-transparent hover:bg-muted/50 transition-colors h-11"
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
