import { Skeleton } from "@/components/ui/skeleton";

export function AdminDashboardSkeleton() {
  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <div className="space-y-3">
        <Skeleton className="h-9 w-[280px]" />
        <Skeleton className="h-5 w-full max-w-[560px]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-8 w-36" />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[1.1fr_1.3fr_90px_120px_80px] gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="grid grid-cols-[1.1fr_1.3fr_90px_120px_80px] items-center gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-8 w-24 rounded-md" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-[1.1fr_1.3fr_90px_120px_80px] items-center gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-8 w-28 rounded-md" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-[1.1fr_1.3fr_90px_120px_80px] items-center gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-8 w-24 rounded-md" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-28" />
          </div>
          <div className="flex items-center gap-8">
            <Skeleton className="h-14 w-20" />
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-36" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-[120px]" />
              </div>
              <Skeleton className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
