import { Skeleton } from "@/components/ui/skeleton";

export function SppgPeriodicReportsSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl tracking-tight">Laporan Periodik</h1>
        <p className="text-muted-foreground">
          Rekap laporan rincian menu dan anggaran
        </p>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Skeleton className="h-10 w-full rounded-md sm:w-[180px]" />
          <Skeleton className="h-10 w-full rounded-md sm:w-[140px]" />
        </div>

        <div className="rounded-2xl border border-border/60 p-5 sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-10 w-full rounded-xl sm:w-32" />
          </div>

          <div className="space-y-3 sm:hidden">
            <div className="rounded-2xl border border-border/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
          </div>

          <div className="hidden space-y-5 sm:block">
            <div className="grid grid-cols-[1.1fr_1fr_1fr_120px_60px] gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid grid-cols-[1.1fr_1fr_1fr_120px_60px] items-center gap-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-[1.1fr_1fr_1fr_120px_60px] items-center gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-[1.1fr_1fr_1fr_120px_60px] items-center gap-4">
              <Skeleton className="h-5 w-[88px]" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
