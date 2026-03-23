import type { ComponentProps } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DashboardCard({
  className,
  ...props
}: ComponentProps<typeof Card>) {
  return (
    <Card className={cn("rounded-xl border-0 ring-0", className)} {...props} />
  );
}
