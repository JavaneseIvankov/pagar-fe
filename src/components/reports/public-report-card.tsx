import Image from "next/image";
import StarRating from "@/components/reports/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TPublicReview } from "@/types";

export interface PublicReportCardProps {
  review: TPublicReview;
}

function formatPostedAt(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function PublicReportCard({ review }: PublicReportCardProps) {
  const author = "Anonim";

  return (
    <Card className="w-full max-w-[933px]">
      <CardHeader className="flex flex-row items-center gap-3 pt-1">
        <Avatar className="h-10 max-h-[60px] w-10 max-w-[60px]">
          <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-semibold text-h4">{author}</h4>

          <p className="text-body-3 text-muted-foreground">
            {formatPostedAt(review.postedAt)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="@container/card-content space-y-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image
            fill
            src={review.imageUrl}
            alt={review.title}
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating value={review.ratingScore} />
            <span className="text-muted-foreground text-sm">
              {review.ratingScore}/5
            </span>
          </div>
          <p className="font-semibold text-body-3">{review.forSppg.sppgName}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold @xs/card-content:text-h2 text-body">
            {review.title}
          </h3>

          <p className="text-body-3">{review.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
