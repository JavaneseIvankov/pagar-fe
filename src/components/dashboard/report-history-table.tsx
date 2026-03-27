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
      <div className="flex items-center gap-4 border-muted/50 border-b px-6 py-5">
        <ReportIcon className="text-[#008445]" />
        <h3 className="font-bold text-lg">Riwayat Laporan</h3>
      </div>
      <div className="p-2 px-4">
        <Table>
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
                <TableCell className="py-4">{report.title}</TableCell>
                <TableCell className="py-4 font-medium">
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
                    >
                      <HugeiconsIcon icon={Download01Icon} size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={18} />
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
