import { Skeleton } from "@/components/ui/skeleton";

export function DataAkunCardSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-3 grid grid-cols-[1.4fr_110px_140px] items-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16 justify-self-center" />
        <Skeleton className="h-4 w-16 justify-self-center" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="grid grid-cols-[1.4fr_110px_140px] items-center gap-4 border-border/50 border-b py-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-7 w-20 justify-self-center rounded-full" />
          <Skeleton className="h-4 w-20 justify-self-center" />
        </div>
        <div className="grid grid-cols-[1.4fr_110px_140px] items-center gap-4 border-border/50 border-b py-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-20 justify-self-center rounded-full" />
          <Skeleton className="h-4 w-20 justify-self-center" />
        </div>
        <div className="grid grid-cols-[1.4fr_110px_140px] items-center gap-4 py-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-7 w-20 justify-self-center rounded-full" />
          <Skeleton className="h-4 w-20 justify-self-center" />
        </div>
      </div>
    </div>
  );
}
