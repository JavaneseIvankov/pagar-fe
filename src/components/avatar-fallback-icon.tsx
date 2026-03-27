import { cn } from "@/lib/utils";
import { PersonIcon } from "./exported-icons";
import { AvatarFallback } from "./ui/avatar";

export function AvatarFallbackIcon({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AvatarFallback>, "children">) {
  return (
    <AvatarFallback
      data-slot="avatar-fallback"
      className={cn("text-foreground/30", className)}
      {...props}
    >
      <PersonIcon className="text-foreground/30" />
    </AvatarFallback>
  );
}
