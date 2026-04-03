import { cn } from "@/lib/utils";
import { PersonIcon } from "./exported-icons";
import { AvatarFallback } from "./ui/avatar";

export function AvatarFallbackIcon({
  className,
  iconClassName,
  ...props
}: Omit<React.ComponentProps<typeof AvatarFallback>, "children"> & {
  iconClassName?: string;
}) {
  return (
    <AvatarFallback
      data-slot="avatar-fallback"
      className={cn("text-foreground/30", className)}
      {...props}
    >
      <PersonIcon className={cn("text-foreground/30", iconClassName)} />
    </AvatarFallback>
  );
}
