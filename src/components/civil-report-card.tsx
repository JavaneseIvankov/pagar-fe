import { Comment, ThumbsUp } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import StarRating from "@/components/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export interface CivilReportCardProps {
  author: string;
  timeSincePosted: string;
  origin: string;
  stars: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  image: string;
}

export function CivilReportCard({
  author,
  timeSincePosted,
  origin,
  stars,
  title,
  content,
  likes,
  comments,
  image,
}: CivilReportCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-3">
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
      </CardHeader>

      <CardContent className="@container/card-content space-y-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image fill src={image} alt={title} className="object-cover" />
        </div>

        <div className="flex items-center gap-2">
          <StarRating value={stars} />

          <span className="text-muted-foreground text-sm">{stars}/5</span>
        </div>

        <div>
          <h3 className="font-semibold @xs/card-content:text-xl text-xs">
            {title}
          </h3>

          <p className="text-muted-foreground text-sm">{content}</p>
        </div>
      </CardContent>

      <CardFooter>
        <CardAction className="flex gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <HugeiconsIcon icon={ThumbsUp} size={16} />
            {likes}
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <HugeiconsIcon icon={Comment} size={16} />
            {comments}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
