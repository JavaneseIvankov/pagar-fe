import { CheckCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatShortDate } from "@/lib/formatters";
import type { TSppgReport } from "@/types";
import { NutritionalFacts } from "./nutritional-facts";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";

export interface SppgReportCardProps {
  report: TSppgReport;
}

export function SppgReportCard({ report }: SppgReportCardProps) {
  const author = report.author.sppgName;
  const postedAt = formatShortDate(report.postedAt);

  return (
    <Card className="card-surface group w-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
      <CardHeader className="flex gap-2.5 border-border/50 border-b px-3 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex w-full min-w-0 flex-row items-center gap-2.5 sm:gap-3">
          <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
            <AvatarFallbackIcon />
          </Avatar>
          <div className="min-w-0">
            <h4 className="truncate font-semibold text-base sm:text-h4">
              {author}
            </h4>
            <p className="truncate text-muted-foreground text-xs sm:text-body-3">
              {postedAt} • {report.mealTime}
            </p>
          </div>
        </div>
        <Badge
          variant={"secondary"}
          className="shrink-0 self-start rounded-full border border-primary/10 bg-primary/5 px-2.5 py-0.5 text-primary sm:px-3 sm:py-1"
        >
          <HoverCard>
            <HoverCardTrigger className="block @xs/card-header:hidden">
              <HugeiconsIcon
                icon={CheckCircle}
                className="size-3.5 sm:size-4"
                aria-hidden="true"
              />
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              className="w-30 text-center text-foreground/40"
            >
              Laporan Resmi
            </HoverCardContent>
          </HoverCard>
          <span className="@xs/card-header:block hidden text-xs sm:text-body-3">
            Laporan Resmi
          </span>
        </Badge>
      </CardHeader>

      <CardContent className="@container/card-content flex flex-col gap-4 px-3 py-3 sm:gap-6 sm:px-6 sm:py-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:rounded-md">
          <Image
            fill
            src={report.imageUrl}
            alt={report.title}
            className="motion-image-reveal object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-out)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex w-full flex-col gap-3 sm:gap-4">
          <h3 className="line-clamp-2 text-balance font-semibold @md/card-content:text-h3 text-base text-h4 leading-snug sm:text-body">
            {report.title}
          </h3>
          <NutritionalFacts facts={report.nutritionalFacts} />
          <p className="line-clamp-4 text-pretty break-words text-foreground/80 text-sm leading-6 sm:text-body-3">
            {report.content}
          </p>
        </div>
      </CardContent>

      <CardFooter className="border-border/50 border-t px-3 py-3 sm:px-6 sm:py-4">
        <CardAction className="flex w-full">
          <Link
            href={`/laporan-sppg/${report.id}`}
            className={buttonVariants({
              variant: "tertiary",
              className:
                "h-10 w-full rounded-lg px-3 font-semibold text-sm transition-[background-color,color,transform] hover:cursor-pointer hover:bg-primary hover:text-primary-foreground sm:ml-auto sm:h-11 sm:w-auto sm:rounded-xl sm:px-4 sm:text-base",
            })}
          >
            Lihat Detail
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
