import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";

/* TASK[ASCENT]: this page will contain DataTable (shadcn + tanstack table) for admin complaints
it's like a more complete view of the AdminComplaintsTable
*/

export default function AdminKeluhanPage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-6 sm:gap-8">
      <DashboardPageHeader className="max-w-3xl">
        <DashboardPageHeader.Actions>
          <Button asChild variant="ghost" className="h-auto w-fit gap-2 p-0">
            <Link href="/dashboard/admin">
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={16}
                aria-hidden="true"
              />
              Kembali
            </Link>
          </Button>
        </DashboardPageHeader.Actions>
        <DashboardPageHeader.Title className="text-balance text-foreground sm:text-[28px] lg:text-[32px]">
          Keluhan Masyarakat
        </DashboardPageHeader.Title>
        <DashboardPageHeader.Description className="text-pretty">
          Tinjau seluruh keluhan masyarakat dalam tampilan lengkap.
        </DashboardPageHeader.Description>
      </DashboardPageHeader>

      <div className="rounded-xl border border-muted-foreground/40 border-dashed bg-muted/20 p-8 text-muted-foreground">
        DataTable keluhan admin akan hadir setelah endpoint list keluhan admin
        dengan pagination tersedia.
      </div>
    </div>
  );
}
