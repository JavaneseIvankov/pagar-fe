"use client";

import { ValidasiAkunCardSkeleton } from "@/components/admin/kelola-akun/validasi-akun-card-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatShortDate } from "@/lib/formatters";
import { getManagedAccountRoleUi } from "@/lib/ui-mappers";
import type { TAdminPendingAccount } from "@/types";

interface ValidasiAkunCardProps {
  items: TAdminPendingAccount[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  updatingAccountId: string | null;
  isLoading?: boolean;
  isError?: boolean;
}

export function ValidasiAkunCard({
  items,
  onApprove,
  onReject,
  updatingAccountId,
  isLoading = false,
  isError = false,
}: ValidasiAkunCardProps) {
  const hasItems = items.length > 0;

  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-4">
        <div className="space-y-1">
          <CardTitle className="font-bold text-lg">
            Validasi Akun SPPG & Sekolah
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Tinjau akun baru sebelum diaktifkan.
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-6 pt-2">
        {isLoading ? (
          <ValidasiAkunCardSkeleton />
        ) : isError ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-destructive/30 border-dashed bg-destructive/5 px-6 text-destructive text-sm">
            Gagal memuat data validasi akun.
          </div>
        ) : hasItems ? (
          <>
            <div className="mb-3 grid grid-cols-[1.2fr_100px_120px] items-center gap-4 font-semibold text-muted-foreground text-xs uppercase">
              <span>Akun</span>
              <span className="text-center">Role</span>
              <span className="text-center">Aksi</span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              {items.map((item) => {
                const isUpdating = updatingAccountId === item.id;
                const roleUi = getManagedAccountRoleUi(item.role);

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1.2fr_100px_120px] items-start gap-4 border-border/50 border-b py-4 last:border-0"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="truncate font-semibold text-sm">
                        {item.username}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Diajukan {formatShortDate(item.createdAt)}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1 text-xs">
                        <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
                          Reg: {item.registrationCode ?? "-"}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
                          BGN: {item.bgnCode ?? "-"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Badge variant="secondary" className={roleUi.className}>
                        {roleUi.label}
                      </Badge>
                    </div>

                    <div className="flex flex-col items-stretch gap-2">
                      <Button
                        type="button"
                        size="sm"
                        className="px-3 py-1 text-xs"
                        disabled={isLoading || isUpdating}
                        onClick={() => onApprove(item.id)}
                      >
                        {isUpdating ? "Memproses..." : "Setuju"}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="px-3 py-1 text-xs"
                        disabled={isLoading || isUpdating}
                        onClick={() => onReject(item.id)}
                      >
                        {isUpdating ? "Memproses..." : "Tolak"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-border/70 border-dashed bg-muted/20 px-6 text-muted-foreground text-sm">
            Tidak ada akun yang menunggu validasi.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
