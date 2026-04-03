import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DashboardPageHeaderProps {
  className?: string;
  children: ReactNode;
}

export interface DashboardPageHeaderSlotProps {
  className?: string;
  children: ReactNode;
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardPageHeaderProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function DashboardPageHeaderTitle({
  className,
  children,
}: DashboardPageHeaderSlotProps) {
  return (
    <h1 className={cn("font-bold text-3xl tracking-tight", className)}>
      {children}
    </h1>
  );
}

export function DashboardPageHeaderDescription({
  className,
  children,
}: DashboardPageHeaderSlotProps) {
  return <p className={cn("text-muted-foreground", className)}>{children}</p>;
}

export function DashboardPageHeaderActions({
  className,
  children,
}: DashboardPageHeaderSlotProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
}

export function DashboardPageHeaderMeta({
  className,
  children,
}: DashboardPageHeaderSlotProps) {
  return (
    <div className={cn("text-muted-foreground text-sm", className)}>
      {children}
    </div>
  );
}

export namespace DashboardPageHeader {
  export const Title = DashboardPageHeaderTitle;
  export const Description = DashboardPageHeaderDescription;
  export const Actions = DashboardPageHeaderActions;
  export const Meta = DashboardPageHeaderMeta;
}
