import Image from "next/image";
import { AvatarFallbackIcon } from "@/components/avatar-fallback-icon";
import StarRating from "@/components/reports/star-rating";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatLongDate } from "@/lib/formatters";
import type { TSppgReview } from "@/types";
import { DashboardCard } from "../dashboard-card";

export interface SppgPublicReviewsTableProps {
  reviews: TSppgReview[];
}

export function SppgPublicReviewsTable({
  reviews,
}: SppgPublicReviewsTableProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center gap-4 border-border/50 border-b px-5 py-5 sm:px-6">
        <h3 className="font-bold text-lg">Laporan Masyarakat</h3>
      </div>
      <div className="flex flex-col gap-4 p-4 sm:hidden">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex gap-3 rounded-2xl border border-border/60 bg-background p-4"
          >
            <Avatar className="size-10 shrink-0">
              <AvatarFallbackIcon />
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">
                    {review.reporterName}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating value={review.ratingScore} size={16} />
                    <span className="text-muted-foreground text-xs">
                      {review.ratingScore}/5
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 break-words text-foreground/80 text-sm">
                    {review.title}
                  </p>
                  <p className="mt-1 line-clamp-3 break-words text-muted-foreground text-xs">
                    {review.content}
                  </p>
                  <p className="mt-2 truncate text-muted-foreground text-xs">
                    {formatLongDate(review.postedAt)}
                  </p>
                </div>
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {review.imageUrl ? (
                    <Image
                      src={review.imageUrl}
                      alt={review.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto p-2 px-4 sm:block">
        <Table className="min-w-[720px]">
          <TableHeader className="bg-transparent">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="h-12 text-left font-medium text-muted-foreground">
                Pelapor
              </TableHead>
              <TableHead className="h-12 font-medium text-muted-foreground">
                Rating
              </TableHead>
              <TableHead className="h-12 font-medium text-muted-foreground">
                Judul Laporan
              </TableHead>
              <TableHead className="h-12 font-medium text-muted-foreground">
                Tanggal
              </TableHead>
              <TableHead className="h-12 w-32 text-right font-medium text-muted-foreground">
                Bukti Foto
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review, index) => (
              <TableRow
                key={review.id}
                className={
                  index === reviews.length - 1
                    ? "border-none"
                    : "border-muted/50"
                }
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallbackIcon />
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-sm">
                        {review.reporterName}
                      </p>
                      <p className="truncate text-muted-foreground text-xs">
                        {review.ratingScore}/5
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <StarRating value={review.ratingScore} size={16} />
                    <span className="text-muted-foreground text-xs">
                      {review.ratingScore}/5
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[260px] py-4">
                  <p className="line-clamp-2 break-words font-medium text-sm">
                    {review.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
                    {review.content}
                  </p>
                </TableCell>
                <TableCell className="py-4 text-muted-foreground text-sm">
                  {formatLongDate(review.postedAt)}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="ml-auto h-16 w-24 overflow-hidden rounded-md bg-muted">
                    {review.imageUrl ? (
                      <Image
                        src={review.imageUrl}
                        alt={review.title}
                        width={96}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
                        -
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
}
