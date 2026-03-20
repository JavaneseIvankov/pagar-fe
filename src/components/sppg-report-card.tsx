import { CheckCircle, Comment, ThumbsUp } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { type NutritionalFact, NutritionalFacts } from "./nutritional-facts";

export interface SppgReportCardProps {
  author: string;
  timeSincePosted: string;
  origin: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  image: string;
  nutritionalFacts: NutritionalFact[];
}

export function SppgReportCard({
  author,
  timeSincePosted,
  origin,
  title,
  content,
  image,
  nutritionalFacts,
}: SppgReportCardProps) {
  return (
    <Card className="w-full max-w-[933px]">
      <CardHeader className="space-between flex flex-row items-center pt-1">
        <div className="flex w-full flex-row items-center gap-3">
          <Avatar className="max-w-[60px] max-h-[60px] w-10 h-10">
            <AvatarImage src={image} />
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-h4">{author}</h4>
            <p className="text-muted-foreground text-body-3">
              {timeSincePosted} • {origin}
            </p>
          </div>
        </div>
        {/* FIXME: consider less hacky solution, no non-token color */}
        <Badge variant={"secondary"} className="text-primary">
          <HoverCard>
            <HoverCardTrigger className="block @xs/card-header:hidden">
              <HugeiconsIcon icon={CheckCircle} className="size-4" />
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

      <CardContent className="@container/card-content space-y-8 pb-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image fill src={image} alt={title} className="object-cover" />
        </div>
        <div className="w-full flex flex-col gap-4">
          <h3 className="font-semibold @xs/card-content:text-h2 text-body">
            {title}
          </h3>
          <NutritionalFacts facts={nutritionalFacts} />
          <p className="text-body-3">{content}</p>
        </div>
      </CardContent>

      <CardFooter>
        <CardAction className="flex w-full justify-end">
          <Button
            variant={"tertiary"}
            className="p-4 font-semibold hover:bg-primary hover:text-primary-foreground hover:cursor-pointer"
          >
            Lihat Detail
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
