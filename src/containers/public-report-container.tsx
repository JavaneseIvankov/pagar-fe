import { PublicReportCard } from "@/components/reports/public-report-card";
import { publicReviews } from "../../mock-data";

export function PublicReportContainer() {
  const review = publicReviews[0];

  // TASK: later, we would need to implement infinite scroll here
  return <PublicReportCard review={review} />;
}
