import { Delete01Icon, Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ReportIcon } from "@/components/exported-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatLongDate } from "@/lib/formatters";
import type { TSppgReportSummary } from "@/types";
import { DashboardCard } from "./dashboard-card";

interface ReportHistoryTableProps {
  reports: TSppgReportSummary[];
}

export function ReportHistoryTable({ reports }: ReportHistoryTableProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center gap-4 border-muted/50 border-b px-5 py-5 sm:px-6">
        <ReportIcon className="text-primary" />
        <h3 className="font-bold text-lg">Riwayat Laporan</h3>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:hidden">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-border/60 bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="line-clamp-2 break-words font-semibold text-sm">
                  {report.title}
                </p>

                <p className="mt-1 text-muted-foreground text-xs tabular-nums">
                  {formatLongDate(report.postedAt)}
                </p>
              </div>

              <Badge
                variant="secondary"
                className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 font-medium text-[11px] text-primary hover:bg-primary/20"
              >
                {report.status === "SUBMITTED" ? "Terkirim" : report.status}
              </Badge>
            </div>

            <div className="mt-4 flex justify-end gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label={`Unduh ${report.title}`}
              >
                <HugeiconsIcon icon={Download01Icon} size={16} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label={`Hapus ${report.title}`}
              >
                <HugeiconsIcon icon={Delete01Icon} size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto p-2 px-4 sm:block">
        <Table className="min-w-[640px] table-fixed">
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="h-10 w-[60%] text-left font-medium text-muted-foreground">
                Nama Laporan
              </TableHead>

              <TableHead className="h-10 w-[25%] font-medium text-muted-foreground">
                Tanggal
              </TableHead>

              <TableHead className="h-10 w-[15%] whitespace-nowrap font-medium text-muted-foreground">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={report.id}
                className={
                  index === reports.length - 1
                    ? "border-none"
                    : "border-muted/50"
                }
              >
                <TableCell className="py-3">
                  <span className="line-clamp-2 break-words font-medium text-sm">
                    {report.title}
                  </span>
                </TableCell>

                <TableCell className="py-3 font-medium text-sm tabular-nums">
                  {formatLongDate(report.postedAt)}
                </TableCell>

                <TableCell className="py-3">
                  <Badge
                    variant="secondary"
                    className="whitespace-nowrap rounded-full bg-primary/10 px-2 py-0.5 font-medium text-[11px] text-primary hover:bg-primary/20"
                  >
                    {report.status === "SUBMITTED" ? "Terkirim" : report.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
}
