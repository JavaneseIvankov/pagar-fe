import { PublicReportCard } from "@/components/reports/public-report-card";
import { fetchPublicReviews } from "@/rpc";

export async function PublicReportContainer() {
  const reviews = await fetchPublicReviews();

  return (
    <div className="flex w-full max-w-[933px] flex-col gap-6">
      {reviews.map((review) => (
        <PublicReportCard key={review.id} review={review} />
      ))}
    </div>
  );
}
