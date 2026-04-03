import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { SppgPublicReviewsContainer } from "@/containers/sppg-public-reviews-container";

/* TASK[ASCENT]: this page will contain DataTable (shadcn + tanstack table) for the PublicReportList
it's like a more complete view of the PublicReportList
*/

export default function SppgDashboardPublicReportPage() {
  // Layout similar to dashboard, with header and subheader
  // in the left side of the subheader there  will be a chevron left icon button (back button), that upon pressed will redirect back to /dashboard/sppg

  // If its not possible to be implemented now, i want to scaffold/create stub page first, so that it'll be easy for the future agents to get context and integrate
  // data into it once the backend already provided endpoints
  return (
    <div className="mx-auto flex w-full flex-col gap-6 sm:gap-8">
      <DashboardPageHeader className="max-w-3xl">
        <DashboardPageHeader.Actions>
          <Button asChild variant="ghost" className="h-auto w-fit gap-2 p-0">
            <Link href="/dashboard/sppg">
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
          Laporan Masyarakat
        </DashboardPageHeader.Title>
        <DashboardPageHeader.Description className="text-pretty">
          Tinjau daftar laporan masyarakat terbaru dalam tampilan lengkap.
        </DashboardPageHeader.Description>
      </DashboardPageHeader>
      <SppgPublicReviewsContainer />
    </div>
  );
}
