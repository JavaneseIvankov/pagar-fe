import { Skeleton } from "@/components/ui/skeleton";

export function ValidasiAkunCardSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-3 grid grid-cols-[1.2fr_100px_120px] items-center gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12 justify-self-center" />
        <Skeleton className="h-4 w-12 justify-self-center" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="grid grid-cols-[1.2fr_100px_120px] items-start gap-4 border-border/50 border-b py-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-7 w-20 justify-self-center rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-[1.2fr_100px_120px] items-start gap-4 border-border/50 border-b py-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-24" />
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-7 w-20 justify-self-center rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-[1.2fr_100px_120px] items-start gap-4 py-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-[88px]" />
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-7 w-20 justify-self-center rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
