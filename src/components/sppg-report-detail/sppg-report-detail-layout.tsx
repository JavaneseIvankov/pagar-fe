import type { ReactNode } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SppgReportDetailLayoutProps {
  title: string;
  hero: ReactNode;
  nutrition: ReactNode;
  budget?: ReactNode;
  vendor: ReactNode;
  related?: ReactNode;
  discrepancy: ReactNode;
}

export interface SppgDetailSectionCardProps {
  children: ReactNode;
  className?: string;
}

export interface SppgDetailSectionHeaderProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

export function SppgDetailSectionCard({
  children,
  className,
}: SppgDetailSectionCardProps) {
  return (
    <Card
      className={cn(
        "w-full rounded-xl border-2 border-foreground/10 shadow-none",
        className,
      )}
    >
      {children}
    </Card>
  );
}

export function SppgDetailSectionHeader({
  title,
  icon,
  className,
}: SppgDetailSectionHeaderProps) {
  return (
    <CardHeader className={cn("flex flex-row items-center gap-3", className)}>
      {icon}
      <h2 className="m-0 font-bold text-h4">{title}</h2>
    </CardHeader>
  );
}

export function SppgReportDetailLayout({
  title,
  hero,
  nutrition,
  budget,
  vendor,
  related,
  discrepancy,
}: SppgReportDetailLayoutProps) {
  return (
    <div className="page-enter mx-auto max-w-6xl space-y-6 pb-10 md:space-y-8">
      <h1 className="mb-4 text-balance border-b pb-4 font-bold text-2xl md:mb-8 md:text-h2">
        Detail Laporan : {title}
      </h1>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-8">
        <div className="left flex w-full flex-col gap-6">
          {hero}
          {nutrition}
          {budget}
        </div>

        <div className="right flex w-full flex-col gap-6 lg:sticky lg:top-6">
          {vendor}
          {related}
          {discrepancy}
        </div>
      </div>
    </div>
  );
}
