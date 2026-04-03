"use client";

import { ValidasiAkunCardSkeleton } from "@/components/admin/kelola-akun/validasi-akun-card-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <div className="mb-3 grid grid-cols-[1fr_1fr_100px_160px] items-center gap-4 font-semibold text-muted-foreground text-xs uppercase">
              <span>Email</span>
              <span>Username</span>
              <span className="text-center">Status</span>
              <span className="text-center">Validasi</span>
            </div>

            <div className="flex max-h-[500px] flex-col gap-1 overflow-y-auto pr-2">
              {items.map((item) => {
                const isUpdating = updatingAccountId === item.id;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_1fr_100px_160px] items-center gap-4 border-border/50 border-b py-4 last:border-0"
                  >
                    <p className="truncate text-muted-foreground text-sm">
                      {item.email}
                    </p>
                    <p className="truncate text-foreground text-sm">
                      @{item.username}
                    </p>

                    <div className="flex justify-center">
                      <Badge className="rounded-full border-0 bg-sky-50 font-medium text-sky-500 hover:bg-sky-50">
                        Menunggu
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-600 text-xs hover:bg-emerald-100 disabled:opacity-50"
                        disabled={isLoading || isUpdating}
                        onClick={() => onApprove(item.id)}
                      >
                        {isUpdating ? "..." : "Setuju"}
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-rose-50 px-3 py-1 font-semibold text-rose-600 text-xs hover:bg-rose-100 disabled:opacity-50"
                        disabled={isLoading || isUpdating}
                        onClick={() => onReject(item.id)}
                      >
                        {isUpdating ? "..." : "Tolak"}
                      </button>
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
