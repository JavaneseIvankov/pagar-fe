import { PublicReportCard } from "@/components/reports/public-report-card";
import { fetchPublicReviews } from "@/rpc/reports";

export async function PublicReportContainer() {
  const reviews = await fetchPublicReviews();

  return (
    <div className="page-enter flex w-full max-w-[933px] flex-col gap-4 sm:gap-6">
      {reviews.map((review) => (
        <PublicReportCard key={review.id} review={review} />
      ))}
    </div>
  );
}
