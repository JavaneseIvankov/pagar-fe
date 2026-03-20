import Image from "next/image";
import StarRating from "@/components/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface PublicReportCardProps {
  author: string;
  timeSincePosted: string;
  stars: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  image: string;
  forSppgName: string;
}

export function PublicReportCard({
  author,
  timeSincePosted,
  stars,
  title,
  content,
  forSppgName,
  image,
}: PublicReportCardProps) {
  return (
    <Card className="w-full max-w-[933px]">
      <CardHeader className="flex flex-row items-center gap-3 pt-1">
        <Avatar className="max-w-[60px] max-h-[60px] w-10 h-10">
          <AvatarImage src={image} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-semibold text-h4">{author}</h4>

          <p className="text-muted-foreground text-body-3">{timeSincePosted}</p>
        </div>
      </CardHeader>

      <CardContent className="@container/card-content space-y-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image fill src={image} alt={title} className="object-cover" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <StarRating value={stars} />
            <span className="text-muted-foreground text-sm">{stars}/5</span>
          </div>
          <p className="text-body-3 font-semibold">{forSppgName}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold @xs/card-content:text-h2 text-body">
            {title}
          </h3>

          <p className="text-body-3">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
