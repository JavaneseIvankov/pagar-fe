import { Skeleton } from "@/components/ui/skeleton";

export function SppgProfileSkeleton() {
  return (
    <div className="flex h-full w-full flex-col pb-10">
      <div className="mb-6 rounded-2xl border border-border/60 p-8">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <Skeleton className="h-36 w-36 rounded-2xl" />
          <div className="w-full space-y-3">
            <Skeleton className="h-9 w-full max-w-[260px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full max-w-[520px]" />
            <Skeleton className="h-4 w-full max-w-[220px]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-52" />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="space-y-5">
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
      </div>

      <p className="mt-8 text-center text-muted-foreground text-sm">
        Memuat pengaturan profil SPPG dan data akun saat ini.
      </p>
    </div>
  );
}
