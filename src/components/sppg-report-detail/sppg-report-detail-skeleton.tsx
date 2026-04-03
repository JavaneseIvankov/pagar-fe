import { Skeleton } from "@/components/ui/skeleton";

export function SppgReportDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10 md:space-y-8">
      <div className="space-y-3 border-b pb-4 md:mb-8">
        <Skeleton className="h-9 w-full max-w-[460px]" />
        <Skeleton className="h-5 w-full max-w-[320px]" />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-8">
        <div className="flex w-full flex-col gap-6">
          <Skeleton className="aspect-[16/9] w-full rounded-xl lg:aspect-[2/1]" />

          <div className="rounded-xl border-2 border-foreground/10 bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-7 w-40" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="space-y-2 rounded-xl border border-border/50 p-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="space-y-2 rounded-xl border border-border/50 p-4">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-8 w-[72px]" />
              </div>
              <div className="space-y-2 rounded-xl border border-border/50 p-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-[72px]" />
              </div>
              <div className="space-y-2 rounded-xl border border-border/50 p-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-[88px]" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-foreground/10 bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-7 w-36" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 rounded-xl border border-border/50 p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-28" />
                </div>
                <div className="space-y-2 rounded-xl border border-border/50 p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-28" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full max-w-[520px]" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 bg-card lg:sticky lg:top-6">
          <div className="rounded-xl border-2 border-foreground/10 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-7 w-28" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full max-w-[240px]" />
            </div>
          </div>

          <div className="rounded-xl border-2 border-foreground/10 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-7 w-36" />
            </div>
            <div className="space-y-3">
              <div className="space-y-2 rounded-xl border border-border/50 p-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-full" />
              </div>
              <div className="space-y-2 rounded-xl border border-border/50 p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-foreground/10 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-7 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full max-w-[220px]" />
              <Skeleton className="h-4 w-full max-w-[180px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
