import { Skeleton } from "@/components/ui/skeleton";

export function AdminProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="space-y-2 pt-2">
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-36" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-28" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-border/50 p-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border/50 p-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border/50 p-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-4 w-full max-w-[420px]" />
      </div>
    </div>
  );
}
