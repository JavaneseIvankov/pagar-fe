import { CheckCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export interface SppgReportCardProps {
  report: TSppgReport;
}

export function SppgReportCard({ report }: SppgReportCardProps) {
  const author = report.author.sppgName;
  const postedAt = formatShortDate(report.postedAt);

  return (
    <Card className="card-surface group w-full max-w-[933px] overflow-hidden rounded-[24px]">
      <CardHeader className="flex flex-col gap-3 border-border/50 border-b px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex w-full min-w-0 flex-row items-center gap-3">
          <Avatar className="h-10 max-h-[60px] w-10 max-w-[60px]">
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h4 className="truncate font-semibold text-h4">{author}</h4>
            <p className="truncate text-body-3 text-muted-foreground">
              {postedAt} • {report.mealTime}
            </p>
          </div>
        </div>
        {/* FIXME: consider less hacky solution, no non-token color */}
        <Badge
          variant={"secondary"}
          className="shrink-0 self-start rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-primary"
        >
          <HoverCard>
            <HoverCardTrigger className="block @xs/card-header:hidden">
              <HugeiconsIcon
                icon={CheckCircle}
                className="size-4"
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
          <span className="@xs/card-header:block hidden text-body-3">
            Laporan Resmi
          </span>
        </Badge>
      </CardHeader>

      <CardContent className="@container/card-content flex flex-col gap-5 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image
            fill
            src={report.imageUrl}
            alt={report.title}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          <h3 className="line-clamp-2 text-balance font-semibold @xs/card-content:text-h2 text-body">
            {report.title}
          </h3>
          <NutritionalFacts facts={report.nutritionalFacts} />
          <p className="line-clamp-4 text-pretty break-words text-body-3 text-foreground/80">
            {report.content}
          </p>
        </div>
      </CardContent>

      <CardFooter className="border-border/50 border-t px-4 py-4 sm:px-6">
        <CardAction className="flex w-full">
          <Link
            href={`/laporan-sppg/${report.id}`}
            className={buttonVariants({
              variant: "tertiary",
              className:
                "h-11 w-full rounded-xl px-4 font-semibold transition-[background-color,color,transform] hover:cursor-pointer hover:bg-primary hover:text-primary-foreground sm:ml-auto sm:w-auto",
            })}
          >
            Lihat Detail
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
