import { Skeleton } from "@/components/ui/skeleton";

export function SppgReportListSkeleton() {
  return (
    <div className="flex w-full max-w-[933px] flex-col gap-4 sm:gap-6">
      <div className="overflow-hidden rounded-[20px] border border-border/60 sm:rounded-[24px]">
        <div className="flex gap-3 border-border/50 border-b px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        <div className="space-y-4 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6">
          <Skeleton className="aspect-[4/3] w-full rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-7 w-full max-w-[420px]" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full max-w-[720px]" />
            <Skeleton className="h-4 w-full max-w-[680px]" />
          </div>
        </div>
        <div className="border-border/50 border-t px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-full rounded-xl sm:w-32" />
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border/60 sm:rounded-[24px]">
        <div className="flex gap-3 border-border/50 border-b px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        <div className="space-y-4 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6">
          <Skeleton className="aspect-[4/3] w-full rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-7 w-full max-w-[460px]" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full max-w-[700px]" />
            <Skeleton className="h-4 w-full max-w-[660px]" />
          </div>
        </div>
        <div className="border-border/50 border-t px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-full rounded-xl sm:w-32" />
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border/60 sm:rounded-[24px]">
        <div className="flex gap-3 border-border/50 border-b px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-[120px]" />
            <Skeleton className="h-4 w-[104px]" />
          </div>
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        <div className="space-y-4 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6">
          <Skeleton className="aspect-[4/3] w-full rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-7 w-full max-w-[400px]" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full max-w-[720px]" />
            <Skeleton className="h-4 w-full max-w-[640px]" />
          </div>
        </div>
        <div className="border-border/50 border-t px-3 py-3 sm:px-6 sm:py-4">
          <Skeleton className="h-10 w-full rounded-xl sm:w-32" />
        </div>
      </div>
    </div>
  );
}
