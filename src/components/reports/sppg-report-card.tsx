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
import { AvatarFallbackIcon } from "../avatar-fallback-icon";
import { NutritionalFacts } from "./nutritional-facts";

export interface SppgReportCardProps {
  report: TSppgReport;
}

export function SppgReportCard({ report }: SppgReportCardProps) {
  const author = report.author.sppgName;
  const postedAt = formatShortDate(report.postedAt);

  return (
    <Card className="@container card-surface group w-full overflow-hidden @[40px]:rounded-[24px] rounded-[20px]">
      <CardHeader className="flex @[40px]:flex-row @[40px]:items-start @[40px]:justify-between @[40px]:gap-3 gap-2.5 border-border/50 border-b @[40px]:px-5 px-3 @[40px]:py-4 py-3">
        <div className="flex w-full min-w-0 flex-row items-center @[40px]:gap-3 gap-2.5">
          <Avatar className="@[40px]:h-9 h-8 @[40px]:w-9 w-8">
            <AvatarFallbackIcon />
          </Avatar>
          <div className="min-w-0">
            <h4 className="truncate font-semibold @[40px]:text-base text-sm">
              {author}
            </h4>
            <p className="truncate @[40px]:text-xs text-[11px] text-muted-foreground">
              {postedAt} • {report.mealTime}
            </p>
          </div>
        </div>
        <Badge
          variant={"secondary"}
          className="shrink-0 self-start rounded-full border border-primary/10 bg-primary/5 @[40px]:px-2.5 px-2 py-0.5 text-primary"
        >
          <HoverCard>
            <HoverCardTrigger className="block @xs:hidden">
              <HugeiconsIcon
                icon={CheckCircle}
                className="@[40px]:size-3.5 size-3"
                aria-hidden="true"
              />
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              className="w-30 text-center text-foreground/40 text-xs"
            >
              Laporan Resmi
            </HoverCardContent>
          </HoverCard>
          <span className="@xs:block hidden @[40px]:text-[11px] text-[10px]">
            Laporan Resmi
          </span>
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col @[40px]:gap-5 gap-4 @[40px]:px-5 px-3 @[40px]:py-5 py-3">
        <div className="relative aspect-[4/3] w-full overflow-hidden @[40px]:rounded-md rounded-sm">
          <Image
            fill
            src={report.imageUrl}
            alt={report.title}
            className="motion-image-reveal object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-out)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex w-full flex-col @[40px]:gap-4 gap-3">
          <h3 className="line-clamp-2 text-balance font-semibold @[40px]:text-base text-sm leading-snug">
            {report.title}
          </h3>
          <NutritionalFacts facts={report.nutritionalFacts} />
          <p className="line-clamp-4 text-pretty break-words @[40px]:text-sm text-foreground/80 text-xs leading-relaxed">
            {report.content}
          </p>
        </div>
      </CardContent>

      <CardFooter className="border-border/50 border-t @[40px]:px-5 px-3 @[40px]:py-4 py-3">
        <CardAction className="flex w-full">
          <Link
            href={`/laporan-sppg/${report.id}`}
            className={buttonVariants({
              variant: "tertiary",
              className:
                "@[40px]:ml-auto @[40px]:h-10 h-9 @[40px]:w-auto w-full @[40px]:rounded-xl rounded-lg @[40px]:px-4 px-3 font-semibold @[40px]:text-sm text-xs transition-[background-color,color,transform] hover:cursor-pointer hover:bg-primary hover:text-primary-foreground",
            })}
          >
            Lihat Detail
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
