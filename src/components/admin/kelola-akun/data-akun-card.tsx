"use client";

import { DataAkunCardSkeleton } from "@/components/admin/kelola-akun/data-akun-card-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatShortDate } from "@/lib/formatters";
import { getManagedAccountRoleUi } from "@/lib/ui-mappers";
import type { TAdminAccountRoleFilter, TAdminManagedAccount } from "@/types";

interface DataAkunCardProps {
  items: TAdminManagedAccount[];
  selectedRoleFilter: TAdminAccountRoleFilter;
  onRoleFilterChange: (value: TAdminAccountRoleFilter) => void;
  isLoading?: boolean;
  isError?: boolean;
}

export function DataAkunCard({
  items,
  selectedRoleFilter,
  onRoleFilterChange,
  isLoading = false,
  isError = false,
}: DataAkunCardProps) {
  const hasItems = items.length > 0;

  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="flex flex-row items-center justify-between gap-4 p-6 pb-4">
        <div className="space-y-1">
          <CardTitle className="font-bold text-lg">Data Akun</CardTitle>
          <p className="text-muted-foreground text-sm">
            Daftar akun aktif yang sudah terverifikasi.
          </p>
        </div>
        <Select
          value={selectedRoleFilter}
          onValueChange={(value) =>
            onRoleFilterChange(value as TAdminAccountRoleFilter)
          }
        >
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua</SelectItem>
            <SelectItem value="SCHOOL">Sekolah</SelectItem>
            <SelectItem value="SPPG">SPPG</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-6 pt-2">
        {isLoading ? (
          <DataAkunCardSkeleton />
        ) : isError ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-destructive/30 border-dashed bg-destructive/5 px-6 text-destructive text-sm">
            Gagal memuat data akun aktif.
          </div>
        ) : hasItems ? (
          <>
            <div className="mb-3 grid grid-cols-[1.4fr_110px_140px] items-center gap-4 font-semibold text-muted-foreground text-xs uppercase">
              <span>Username</span>
              <span className="text-center">Role</span>
              <span className="text-center">Dibuat</span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              {items.map((item) => {
                const roleUi = getManagedAccountRoleUi(item.role);

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1.4fr_110px_140px] items-center gap-4 border-border/50 border-b py-3 last:border-0"
                  >
                    <p className="truncate font-semibold text-sm">
                      {item.username}
                    </p>
                    <div className="flex justify-center">
                      <Badge variant="secondary" className={roleUi.className}>
                        {roleUi.label}
                      </Badge>
                    </div>
                    <span className="text-center text-muted-foreground text-sm">
                      {formatShortDate(item.createdAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-border/70 border-dashed bg-muted/20 px-6 text-muted-foreground text-sm">
            Tidak ada akun aktif untuk filter ini.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
