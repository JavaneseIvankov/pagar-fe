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
  likes,
  comments,
  image,
  nutritionalFacts,
}: SppgReportCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-between flex flex-row items-center">
        <div className="flex w-full flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-muted-foreground text-sm">
              {timeSincePosted} • {origin}
            </p>
          </div>
        </div>
        <Badge variant={"secondary"} className="text-yellow-500">
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
          <span className="@xs/card-header:block hidden">Laporan Resmi</span>
        </Badge>
      </CardHeader>

      <CardContent className="@container/card-content space-y-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image fill src={image} alt={title} className="object-cover" />
        </div>
        <div className="w-full">
          <h3 className="font-semibold @xs/card-content:text-xl text-xs">
            {title}
          </h3>

          <NutritionalFacts facts={nutritionalFacts} />

          <p className="text-muted-foreground text-sm">{content}</p>
        </div>
      </CardContent>

      <CardFooter>
        <CardAction className="flex w-full justify-between">
          <span className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <HugeiconsIcon icon={ThumbsUp} className="" absoluteStrokeWidth />
              {likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <HugeiconsIcon icon={Comment} className="" absoluteStrokeWidth />
              {comments}
            </Button>
          </span>
          <Button
            variant={"secondary"}
            className="p-4 font-semibold text-yellow-500"
          >
            Lihat Detail
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
