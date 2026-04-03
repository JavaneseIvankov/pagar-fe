import { Skeleton } from "@/components/ui/skeleton";

export function SppgPublicReviewsSkeleton() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
      <div className="flex items-center gap-3 border-border/50 border-b pb-4">
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6">
        <div className="flex gap-3 rounded-2xl border border-border/60 p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <Skeleton className="h-16 w-16 rounded-xl" />
        </div>
        <div className="flex gap-3 rounded-2xl border border-border/60 p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <Skeleton className="h-16 w-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
