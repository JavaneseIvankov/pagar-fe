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
        <ReportIcon className="text-[#008445]" />
        <h3 className="font-bold text-lg">Riwayat Laporan</h3>
      </div>
      <div className="flex flex-col gap-4 p-4 sm:hidden">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-border/60 bg-white/75 p-4"
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
                className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-600 text-xs hover:bg-emerald-50"
              >
                {report.status === "SUBMITTED" ? "Terkirim" : report.status}
              </Badge>
            </div>
            <div className="mt-4 flex justify-end gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-foreground"
                aria-label={`Unduh ${report.title}`}
              >
                <HugeiconsIcon
                  icon={Download01Icon}
                  size={18}
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-foreground"
                aria-label={`Hapus ${report.title}`}
              >
                <HugeiconsIcon
                  icon={Delete01Icon}
                  size={18}
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto p-2 px-4 sm:block">
        <Table className="min-w-[640px]">
          <TableHeader className="bg-transparent">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="h-12 text-left font-medium text-muted-foreground">
                Nama Laporan
              </TableHead>
              <TableHead className="h-12 font-medium text-muted-foreground">
                Tanggal
              </TableHead>
              <TableHead className="h-12 font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="h-12 w-24 text-right font-medium text-muted-foreground">
                Aksi
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
                <TableCell className="max-w-[280px] py-4">
                  <span className="line-clamp-2 break-words font-medium">
                    {report.title}
                  </span>
                </TableCell>
                <TableCell className="py-4 font-medium tabular-nums">
                  {formatLongDate(report.postedAt)}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-600 text-xs hover:bg-emerald-50"
                  >
                    {report.status === "SUBMITTED" ? "Terkirim" : report.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                      aria-label={`Unduh ${report.title}`}
                    >
                      <HugeiconsIcon
                        icon={Download01Icon}
                        size={18}
                        aria-hidden="true"
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                      aria-label={`Hapus ${report.title}`}
                    >
                      <HugeiconsIcon
                        icon={Delete01Icon}
                        size={18}
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
}
