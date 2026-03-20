"use client";

import {
  HelpCircleFreeIcons,
  Logout,
  SettingsIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HelpCircle = () => (
  <HugeiconsIcon
    icon={HelpCircleFreeIcons}
    strokeWidth={2}
    className="pointer-events-none"
  />
);
const LogOut = () => (
  <HugeiconsIcon
    icon={Logout}
    strokeWidth={2}
    className="pointer-events-none"
  />
);
const Settings = () => (
  <HugeiconsIcon
    icon={SettingsIcon}
    strokeWidth={2}
    className="pointer-events-none"
  />
);
const User = () => (
  <HugeiconsIcon
    icon={UserIcon}
    strokeWidth={2}
    className="pointer-events-none"
  />
);

const ProfileButton = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="relative h-10 w-10 rounded-full" variant="ghost">
        <Avatar>
          <AvatarImage
            alt="@haydenbleasel"
            src="https://github.com/haydenbleasel.png"
          />
          <AvatarFallback>HB</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="font-medium text-sm leading-none">Hayden Bleasel</p>
          <p className="text-muted-foreground text-xs leading-none">
            hello@haydenbleasel.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <User />
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings />
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem>
        <HelpCircle />
        Help
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ProfileButton;
