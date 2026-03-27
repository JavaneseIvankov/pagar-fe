"use client";

import { Logout, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";

const LogOut = () => (
  <HugeiconsIcon
    icon={Logout}
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

const ProfileButton = ({
  username,
  email,
  onLogout,
}: {
  username: string;
  email: string;
  onLogout?: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="relative h-10 w-10 rounded-full" variant="ghost">
        <Avatar>
          <AvatarImage alt="@haydenbleasel" src="" />
          <AvatarFallbackIcon />
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="font-medium text-sm leading-none">{username}</p>
          <p className="text-muted-foreground text-xs leading-none">{email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href={"/profile"}>
          <User />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onClick={onLogout}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ProfileButton;
