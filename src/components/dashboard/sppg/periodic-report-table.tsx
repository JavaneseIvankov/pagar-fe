"use client";

import { Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyIdr } from "@/lib/formatters";
import { MOTION_TRANSITIONS } from "@/lib/motion/tokens";
import { getPeriodicReportVerificationStatusUi } from "@/lib/ui-mappers";
import type { TSppgPeriodicReport } from "@/types";

interface PeriodicReportFilterOption {
  label: string;
  value: string;
}

interface PeriodicReportTableProps {
  data: TSppgPeriodicReport[];
  downloadingReportId: null | string;
  monthOptions: readonly PeriodicReportFilterOption[];
  onDownload: (report: TSppgPeriodicReport) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  selectedMonth: string;
  selectedYear: string;
  yearOptions: readonly string[];
}

export function PeriodicReportTable({
  data,
  downloadingReportId,
  monthOptions,
  onDownload,
  onMonthChange,
  onYearChange,
  selectedMonth,
  selectedYear,
  yearOptions,
}: PeriodicReportTableProps) {
  return (
    <div className="mt-4 flex flex-col">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="h-10 w-full bg-background sm:w-[180px]">
            <SelectValue placeholder="Pilih periode" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {monthOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="h-10 w-full bg-background sm:w-[140px]">
            <SelectValue placeholder="Pilih tahun" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {yearOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DashboardCard className="overflow-hidden p-5 sm:p-8">
        {/* Table Header / Action */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-balance font-bold text-xl">Rekap Laporan</h2>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {data.length === 0 ? (
            <motion.div
              key={`empty-${selectedMonth}-${selectedYear}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={MOTION_TRANSITIONS.baseOut}
              className="rounded-2xl border border-border/60 border-dashed bg-muted/30 px-4 py-10 text-center text-muted-foreground text-sm"
            >
              Belum ada laporan periodik untuk periode yang dipilih.
            </motion.div>
          ) : (
            <motion.div
              key={`data-${selectedMonth}-${selectedYear}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={MOTION_TRANSITIONS.baseOut}
            >
              <div className="flex flex-col gap-3 sm:hidden">
                {data.map((report) => (
                  <div
                    key={report.id}
                    className="rounded-2xl border border-border/60 bg-white/75 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm">
                          {report.periode}
                        </p>
                        <p className="mt-1 text-muted-foreground text-xs">
                          {report.totalMeal} Buah
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          getPeriodicReportVerificationStatusUi(report.status)
                            .className
                        }
                      >
                        {
                          getPeriodicReportVerificationStatusUi(report.status)
                            .label
                        }
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="font-semibold text-sm tabular-nums">
                        {formatCurrencyIdr(report.totalBudget)}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-9 text-foreground hover:bg-gray-100"
                        aria-label={`Unduh rekap ${report.periode}`}
                        disabled={downloadingReportId === report.id}
                        onClick={() => onDownload(report)}
                      >
                        <HugeiconsIcon
                          icon={Download01Icon}
                          size={20}
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Table className="hidden sm:table">
                <TableHeader>
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="pb-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      PERIODE
                    </TableHead>
                    <TableHead className="pb-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      TOTAL MENU
                    </TableHead>
                    <TableHead className="pb-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      TOTAL ANGGARAN
                    </TableHead>
                    <TableHead className="pb-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      STATUS
                    </TableHead>
                    <TableHead className="pb-4 text-right font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      AKSI
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((report) => (
                    <TableRow
                      key={report.id}
                      className="border-none hover:bg-transparent"
                    >
                      <TableCell className="py-5 font-medium text-[15px]">
                        {report.periode}
                      </TableCell>
                      <TableCell className="py-5 font-medium text-[15px]">
                        {report.totalMeal} Buah
                      </TableCell>
                      <TableCell className="py-5 font-medium text-[15px]">
                        {formatCurrencyIdr(report.totalBudget)}
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge
                          variant="secondary"
                          className={
                            getPeriodicReportVerificationStatusUi(report.status)
                              .className
                          }
                        >
                          {
                            getPeriodicReportVerificationStatusUi(report.status)
                              .label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell className="py-5 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-foreground hover:bg-gray-100"
                          aria-label={`Unduh rekap ${report.periode}`}
                          disabled={downloadingReportId === report.id}
                          onClick={() => onDownload(report)}
                        >
                          <HugeiconsIcon
                            icon={Download01Icon}
                            size={20}
                            aria-hidden="true"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardCard>
    </div>
  );
}
