"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

import {
  DashboardIcon,
  ForkAndSpoonIcon,
  PersonCircleIcon,
  PersonIcon,
  ReportIcon,
} from "../exported-icons";

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  prefetch?: boolean | "auto";
  activeMatchers?: readonly string[];
};

const sidebarStructure = {
  sppg: [
    {
      title: "Dashboard",
      href: "/dashboard/sppg",
      icon: DashboardIcon,
      prefetch: true,
      activeMatchers: ["/dashboard/sppg/laporan-publik"],
    },
    {
      title: "Manajemen Laporan",
      href: "/dashboard/sppg/manajemen-laporan",
      icon: ForkAndSpoonIcon,
      prefetch: true,
      activeMatchers: [],
    },

    {
      title: "Laporan Periodik",
      href: "/dashboard/sppg/laporan-periodik",
      icon: ReportIcon,
      prefetch: "auto",
      activeMatchers: [],
    },

    {
      title: "Profil",
      href: "/dashboard/sppg/profil",
      icon: PersonCircleIcon,
      prefetch: true,
      activeMatchers: [],
    },
  ] satisfies readonly SidebarItem[],

  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: DashboardIcon,
      prefetch: true,
    },

    {
      title: "Kelola Akun",
      href: "/dashboard/admin/kelola-akun",
      icon: PersonIcon,
      prefetch: "auto",
    },

    {
      title: "Profil Pengguna",
      href: "/dashboard/admin/profil",
      icon: PersonCircleIcon,
      prefetch: true,
    },
  ] satisfies readonly SidebarItem[],
} as const;

const getCurrentSection = (pathname: string) => {
  return pathname.split("/")[2] as keyof typeof sidebarStructure;
};

const getIsActive = (pathname: string, item: SidebarItem): boolean => {
  if (item.activeMatchers) {
    return (
      item.activeMatchers.some((path) => pathname.startsWith(path)) ||
      pathname === item.href
    );
  }

  return pathname === item.href;
};

export function DashboardSidebarNav() {
  const pathname = usePathname();

  const { isMobile, setOpenMobile } = useSidebar();

  const section = getCurrentSection(pathname);

  const navItems = sidebarStructure[section] ?? [];

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {navItems.map((item) => {
          const isActive = getIsActive(pathname, item);

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                size="lg"
                isActive={isActive}
                tooltip={item.title}
                className="h-11 rounded-lg px-4 font-bold hover:bg-muted/50 data-[active=true]:bg-transparent data-[active=true]:font-black data-[active=true]:text-primary"
              >
                <Link
                  href={item.href}
                  className="relative flex items-center gap-3"
                  prefetch={item.prefetch}
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false);
                    }
                  }}
                >
                  <item.icon className="relative z-10" />

                  <span
                    className={cn(
                      "relative z-10 max-w-[200px] overflow-hidden whitespace-nowrap transition-[max-width,opacity,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:-translate-x-1 group-data-[collapsible=icon]:opacity-0",
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
