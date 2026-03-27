import Image from "next/image";
import StarRating from "@/components/reports/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatShortDate } from "@/lib/formatters";
import type { TPublicReview } from "@/types";

export interface PublicReportCardProps {
  review: TPublicReview;
}

export function PublicReportCard({ review }: PublicReportCardProps) {
  const author = review.reporterName;

  return (
    <Card className="card-surface group w-full max-w-[933px] overflow-hidden rounded-[24px]">
      <CardHeader className="flex flex-row items-center gap-3 border-border/50 border-b px-4 py-4 sm:px-6">
        <Avatar className="h-10 max-h-[60px] w-10 max-w-[60px]">
          <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h4 className="truncate font-semibold text-h4">{author}</h4>

          <p className="truncate text-body-3 text-muted-foreground">
            {formatShortDate(review.postedAt)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="@container/card-content flex flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image
            fill
            src={review.imageUrl}
            alt={review.title}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <StarRating value={review.ratingScore} />
            <span className="text-muted-foreground text-sm">
              {review.ratingScore}/5
            </span>
          </div>
          <p className="line-clamp-2 break-words font-semibold text-body-3 text-foreground/80 sm:text-right">
            {review.forSppg.sppgName}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-2 text-balance font-semibold @xs/card-content:text-h2 text-body">
            {review.title}
          </h3>

          <p className="line-clamp-4 text-pretty break-words text-body-3 text-foreground/80">
            {review.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
