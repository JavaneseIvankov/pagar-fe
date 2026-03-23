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

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/sppg",
    icon: DashboardSquare01Icon,
  },
  {
    title: "Manajemen Laporan",
    href: "/dashboard/sppg/manajemen-laporan",
    icon: Restaurant01Icon,
  },
  {
    title: "Laporan Periodik",
    href: "/dashboard/sppg/laporan-periodik",
    icon: File01Icon,
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
                className="font-semibold px-4 rounded-lg data-[active=true]:bg-transparent data-[active=true]:text-emerald-500 hover:bg-muted/50 transition-colors h-11"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={item.icon}
                    size={20}
                    className={
                      isActive
                        ? "text-emerald-500 stroke-2"
                        : "text-muted-foreground stroke-2"
                    }
                  />
                  <span
                    className={cn(
                      "group-data-[collapsible=icon]:opacity-0",
                      isActive ? "text-emerald-500" : "text-muted-foreground",
                    )}
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
