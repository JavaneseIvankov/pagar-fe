import Image from "next/image";
import StarRating from "@/components/reports/star-rating";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatShortDate } from "@/lib/formatters";
import type { TPublicReview } from "@/types";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";

export interface PublicReportCardProps {
  review: TPublicReview;
}

export function PublicReportCard({ review }: PublicReportCardProps) {
  const author = review.reporterName;

  return (
    <Card className="card-surface group w-full max-w-[933px] overflow-hidden rounded-[20px] sm:rounded-[24px]">
      <CardHeader className="flex flex-row items-center gap-2.5 border-border/50 border-b px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
        <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
          <AvatarFallbackIcon />
        </Avatar>

        <div className="min-w-0">
          <h4 className="truncate font-semibold text-base sm:text-h4">
            {author}
          </h4>

          <p className="truncate text-muted-foreground text-xs sm:text-body-3">
            {formatShortDate(review.postedAt)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="@container/card-content flex flex-col gap-3 px-3 py-3 sm:gap-5 sm:px-6 sm:py-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:rounded-md">
          <Image
            fill
            src={review.imageUrl}
            alt={review.title}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <StarRating value={review.ratingScore} />
            <span className="text-muted-foreground text-xs sm:text-sm">
              {review.ratingScore}/5
            </span>
          </div>
          <p className="line-clamp-2 break-words font-semibold text-foreground/80 text-sm leading-6 sm:text-right sm:text-body-3">
            {review.forSppg.sppgName}
          </p>
        </div>

        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h3 className="line-clamp-2 text-balance font-semibold @md/card-content:text-h3 text-base text-h4 leading-snug sm:text-body">
            {review.title}
          </h3>

          <p className="line-clamp-4 text-pretty break-words text-foreground/80 text-sm leading-6 sm:text-body-3">
            {review.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
