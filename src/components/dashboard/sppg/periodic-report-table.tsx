"use client";

import { ArrowRight01Icon, Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
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
import type { TSppgPeriodicReport } from "@/types";

interface PeriodicReportTableProps {
  data: TSppgPeriodicReport[];
}

export function PeriodicReportTable({ data }: PeriodicReportTableProps) {
  // These are intentionally kept for future functional hooking.
  // TODO: confirm, what are the enum for this?
  const [periode, setPeriode] = useState<"Bulanan" | "Mingguan">("Bulanan");
  const [year, setYear] = useState<string>("");

  return (
    <div className="mt-4 flex flex-col">
      {/* Filters (visually at the top right of the whole block in design, but structurally cleaner right above the card) */}
      <div className="mb-6 flex justify-end gap-3">
        <Select value={periode} onValueChange={setPeriode}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Bulanan" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Januari</SelectItem>
            <SelectItem value="1">Februari</SelectItem>
            <SelectItem value="2">Maret</SelectItem>
            <SelectItem value="3">April</SelectItem>
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Tahun" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DashboardCard className="p-8">
        {/* Table Header / Action */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-bold text-xl">Rekap Laporan</h2>
          <Button className="rounded-lg bg-emerald-600 px-6 text-white hover:bg-emerald-700">
            Lihat Semua{" "}
            <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2" size={18} />
          </Button>
        </div>

        {/* Table */}
        <Table>
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
                  Rp {report.totalBudget.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="py-5">
                  <Badge
                    variant="secondary"
                    className="whitespace-nowrap rounded-md border-none bg-emerald-50 px-4 py-1.5 font-semibold text-emerald-600 text-sm hover:bg-emerald-50"
                  >
                    {report.status === "VERIFIED"
                      ? "Terverifikasi"
                      : "Belum Verifikasi"}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:bg-gray-100"
                  >
                    <HugeiconsIcon icon={Download01Icon} size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardCard>
    </div>
  );
}
