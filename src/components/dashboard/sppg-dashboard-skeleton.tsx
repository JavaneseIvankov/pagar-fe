import { Skeleton } from "@/components/ui/skeleton";

export function SppgDashboardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 sm:gap-8">
      <div className="max-w-3xl space-y-3">
        <Skeleton className="h-10 w-full max-w-[420px]" />
        <Skeleton className="h-5 w-full max-w-[520px]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-36" />
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-[72px] rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60">
        <div className="flex items-center gap-4 border-border/50 border-b px-5 py-5 sm:px-6">
          <Skeleton className="h-6 w-36" />
        </div>
        <div className="space-y-4 p-4 sm:hidden">
          <div className="rounded-2xl border border-border/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </div>
        <div className="hidden p-4 sm:block">
          <div className="space-y-4">
            <div className="grid grid-cols-[1.4fr_1fr_120px_80px] gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_120px_80px] items-center gap-4">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <div className="flex justify-end gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_120px_80px] items-center gap-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <div className="flex justify-end gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_120px_80px] items-center gap-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <div className="flex justify-end gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60">
        <div className="flex flex-col gap-3 border-border/50 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-4 p-4 sm:hidden">
          <div className="flex gap-3 rounded-2xl border border-border/60 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-16 w-16 rounded-xl" />
          </div>
          <div className="flex gap-3 rounded-2xl border border-border/60 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-16 w-16 rounded-xl" />
          </div>
        </div>
        <div className="hidden flex-col gap-6 px-6 pb-6 sm:flex">
          <div className="mb-2 grid grid-cols-12 gap-4">
            <Skeleton className="col-span-3 h-4 w-full" />
            <Skeleton className="col-span-7 h-4 w-full" />
            <Skeleton className="col-span-2 h-4 w-full" />
          </div>
          <div className="grid grid-cols-12 items-start gap-4">
            <div className="col-span-3 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="col-span-7 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="col-span-2 flex justify-end">
              <Skeleton className="h-16 w-24 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-12 items-start gap-4">
            <div className="col-span-3 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="col-span-7 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="col-span-2 flex justify-end">
              <Skeleton className="h-16 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
