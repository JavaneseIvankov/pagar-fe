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

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/sppg",
    icon: DashboardIcon,
    prefetch: true,
  },
  {
    title: "Manajemen Laporan",
    href: "/dashboard/sppg/manajemen-laporan",
    icon: ForkAndSpoonIcon,
    prefetch: true,
  },
  {
    title: "Laporan Periodik",
    href: "/dashboard/sppg/laporan-periodik",
    icon: ReportIcon,
    prefetch: "auto",
  },
  {
    title: "Profil",
    href: "/dashboard/sppg/profil",
    icon: PersonCircleIcon,
    prefetch: true,
  },
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
] as const;

// TODO: we can improve perf by just using nested object structure in sidebarItems
const visibleNavItems = (pathname: string) => {
  const segment = pathname.split("/")[2]; // "sppg" | "admin"
  return sidebarItems.filter((item) =>
    item.href.includes(`/dashboard/${segment}`),
  );
};

export function DashboardSidebarNav() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const navItems = visibleNavItems(pathname);

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
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
