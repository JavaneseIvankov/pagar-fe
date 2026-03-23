"use client";

import {
  ArrowUpDownIcon,
  HelpCircleFreeIcons,
  Logout01Icon,
  SettingsIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function DashboardSidebarProfile() {
  const { isMobile, state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl h-14 w-full"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src="https://github.com/haydenbleasel.png"
                  alt="Hayden Bleasel"
                />
                <AvatarFallback className="rounded-full">HB</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">Hayden Bleasel</span>
                <span className="truncate text-xs text-muted-foreground">
                  hello@haydenbleasel.com
                </span>
              </div>
              <HugeiconsIcon
                icon={ArrowUpDownIcon}
                size={16}
                className="ml-auto opacity-50 group-data-[collapsible=icon]:hidden"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    src="https://github.com/haydenbleasel.png"
                    alt="Hayden Bleasel"
                  />
                  <AvatarFallback className="rounded-full">HB</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Hayden Bleasel</span>
                  <span className="truncate text-xs text-muted-foreground">
                    hello@haydenbleasel.com
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={UserIcon} size={16} className="mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={SettingsIcon} size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon
                  icon={HelpCircleFreeIcons}
                  size={16}
                  className="mr-2"
                />
                Help
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <HugeiconsIcon icon={Logout01Icon} size={16} className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
