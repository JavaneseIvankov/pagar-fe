import { Skeleton } from "@/components/ui/skeleton";

export function PublicReportListSkeleton() {
  return (
    <div className="flex w-full max-w-[933px] flex-col gap-4 sm:gap-6">
      <div className="overflow-hidden rounded-[20px] border border-border/60 sm:rounded-[24px]">
        <div className="flex items-center gap-3 border-border/50 border-b px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="space-y-4 px-3 py-3 sm:space-y-5 sm:px-6 sm:py-6">
          <Skeleton className="aspect-[4/3] w-full rounded-md" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-full max-w-[360px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full max-w-[720px]" />
            <Skeleton className="h-4 w-full max-w-[680px]" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border/60 sm:rounded-[24px]">
        <div className="flex items-center gap-3 border-border/50 border-b px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="space-y-4 px-3 py-3 sm:space-y-5 sm:px-6 sm:py-6">
          <Skeleton className="aspect-[4/3] w-full rounded-md" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-full max-w-[380px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full max-w-[700px]" />
            <Skeleton className="h-4 w-full max-w-[640px]" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border/60 sm:rounded-[24px]">
        <div className="flex items-center gap-3 border-border/50 border-b px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-[120px]" />
            <Skeleton className="h-4 w-[72px]" />
          </div>
        </div>
        <div className="space-y-4 px-3 py-3 sm:space-y-5 sm:px-6 sm:py-6">
          <Skeleton className="aspect-[4/3] w-full rounded-md" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-full max-w-[340px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full max-w-[720px]" />
            <Skeleton className="h-4 w-full max-w-[620px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
