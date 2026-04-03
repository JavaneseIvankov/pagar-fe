import Image from "next/image";
import StarRating from "@/components/reports/star-rating";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatShortDate } from "@/lib/formatters";
import type { TPublicReview, TSppgReview } from "@/types";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";

export interface PublicReportCardProps {
  review: TPublicReview | TSppgReview;
  showSppgName?: boolean;
}

export function PublicReportCard({
  review,
  showSppgName = true,
}: PublicReportCardProps) {
  const author = review.reporterName;
  const sppgName = "forSppg" in review ? review.forSppg.sppgName : null;

  return (
    <Card className="@container card-surface group w-full overflow-hidden @[40px]:rounded-[24px] rounded-[20px]">
      <CardHeader className="flex flex-row items-center @[40px]:gap-3 gap-2.5 border-border/50 border-b @[40px]:px-5 px-3 @[40px]:py-4 py-3">
        <Avatar className="@[40px]:h-9 h-8 @[40px]:w-9 w-8">
          <AvatarFallbackIcon />
        </Avatar>

        <div className="min-w-0">
          <h4 className="truncate font-semibold @[40px]:text-base text-sm">
            {author}
          </h4>

          <p className="truncate @[40px]:text-xs text-muted-foreground text-xs">
            {formatShortDate(review.postedAt)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col @[40px]:gap-4 gap-3 @[40px]:px-5 @[40px]:py-5 py-3">
        <div className="relative aspect-[4/3] w-full overflow-hidden @[40px]:rounded-md rounded-sm">
          <Image
            fill
            src={review.imageUrl}
            alt={review.title}
            className="motion-image-reveal object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-out)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex @[40px]:flex-row flex-col @[40px]:items-center @[40px]:justify-between @[40px]:gap-3 gap-2.5">
          <div className="flex items-center @[40px]:gap-2 gap-1.5">
            <StarRating value={review.ratingScore} />
            <span className="@[40px]:text-xs text-muted-foreground text-xs">
              {review.ratingScore}/5
            </span>
          </div>
          {showSppgName && sppgName ? (
            <p className="line-clamp-2 break-words @[40px]:text-right font-semibold @[40px]:text-sm text-foreground/80 text-xs leading-snug">
              {sppgName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col @[40px]:gap-2 gap-1.5">
          <h3 className="line-clamp-2 text-balance font-semibold @[40px]:text-base text-sm leading-snug">
            {review.title}
          </h3>

          <p className="line-clamp-4 text-pretty break-words @[40px]:text-sm text-foreground/80 text-xs leading-relaxed">
            {review.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
