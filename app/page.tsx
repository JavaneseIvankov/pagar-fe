import {
  CheckCircle,
  Comment,
  FileVerifiedIcon,
  People,
  ThumbsUp,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import type { ReactNode } from "react";
import StarRating from "@/components/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ComponentExample({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>

      <div className="flex items-center justify-center p-8 border rounded-lg bg-background">
        {children}
      </div>
    </div>
  );
}

function CivilReportCard() {
  const author = "Anonim";
  const timeSincePosted = "2 jam lalu";
  const origin = "SDN Kauman 1 Malang";

  const stars = 4;
  const title = "Menu Ikan Goreng dafadfafadf dfafja";

  const content =
    "Sayurnya agak layu tapi ikan segar. Porsi nasi bisa ditambah.";

  const likes = 124;
  const comments = 18;

  const image = "https://placehold.co/600x400";

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-medium">{author}</h4>

          <p className="text-sm text-muted-foreground">
            {timeSincePosted} • {origin}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 @container/card-content">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image fill src={image} alt={title} className="object-cover" />
        </div>

        <div className="flex items-center gap-2">
          <StarRating value={stars} />

          <span className="text-sm text-muted-foreground">{stars}/5</span>
        </div>

        <div>
          <h3 className="font-semibold text-xs @xs/card-content:text-xl">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">{content}</p>
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

function SppgReportCard() {
  const author = "Anonim";
  const timeSincePosted = "2 jam lalu";
  const origin = "SDN Kauman 1 Malang";

  const title = "Menu Ikan Goreng dafadfafadf dfafja";

  const content =
    "Sayurnya agak layu tapi ikan segar. Porsi nasi bisa ditambah.";

  const likes = 124;
  const comments = 18;

  const image = "https://placehold.co/600x400";
  const nutritionalFacts = {
    caloriesKcal: 710,
    proteinGrams: 35,
    carbGrams: 65,
    fatGrams: 65,
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-between">
        <div className="flex flex-row items-center w-full gap-3">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-sm text-muted-foreground">
              {timeSincePosted} • {origin}
            </p>
          </div>
        </div>
        <Badge variant={"secondary"} className="text-yellow-500">
          <HoverCard>
            <HoverCardTrigger className="block @xs/card-header:hidden">
              <HugeiconsIcon icon={CheckCircle} />
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              className="text-center w-30 text-foreground/40"
            >
              Laporan Resmi
            </HoverCardContent>
          </HoverCard>
          <span className="hidden @xs/card-header:block">Laporan Resmi</span>
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 @container/card-content">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image fill src={image} alt={title} className="object-cover" />
        </div>
        <div></div>
        <div className="w-full">
          <h3 className="font-semibold text-xs @xs/card-content:text-xl">
            {title}
          </h3>
          {/* TASK: extract this into separate component */}
          <div className="@container my-2 w-full">
            <div className="grid @[240px]:grid-cols-4 grid-cols-2 gap-2 rounded-lg">
              <div className="py-2 text-center border-0 rounded-lg px -2 bg-muted">
                <p className="text-xs text-foreground/30">KALORI</p>
                <p className="text-sm font-black lg:text-md">
                  {nutritionalFacts.caloriesKcal} kcal
                </p>
              </div>

              <div className="px-2 py-2 text-center border-0 rounded-lg t bg-muted">
                <p className="text-xs text-foreground/30">PROTEIN</p>
                <p className="text-sm font-black lg:text-md">
                  {nutritionalFacts.proteinGrams} gram
                </p>
              </div>

              <div className="px-2 py-2 text-center border-0 rounded-lg bg-muted">
                <p className="text-xs text-foreground/30">KARBO</p>
                <p className="text-sm font-black lg:text-md">
                  {nutritionalFacts.carbGrams} gram
                </p>
              </div>

              <div className="px-2 py-2 text-center border-0 rounded-lg bg-muted">
                <p className="text-xs text-foreground/30">LEMAK</p>
                <p className="text-sm font-black lg:text-md">
                  {nutritionalFacts.fatGrams} gram
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      </CardContent>

      <CardFooter>
        <CardAction className="flex justify-between w-full">
          <span className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <HugeiconsIcon
                icon={ThumbsUp}
                className="size-6"
                absoluteStrokeWidth
              />
              {likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <HugeiconsIcon
                icon={Comment}
                className="size-6"
                absoluteStrokeWidth
              />
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

function ReportTabs() {
  return (
    <Tabs defaultValue="1">
      <TabsList>
        <TabsTrigger value="1" className="flex gap-2">
          <HugeiconsIcon icon={People} size={14} />
          Laporan Masyarakat
        </TabsTrigger>
        <TabsTrigger value="2" className="flex gap-2">
          <HugeiconsIcon icon={FileVerifiedIcon} size={14} />
          Laporan SPPG
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default function Page() {
  return (
    <main className="max-w-6xl px-6 py-12 mx-auto space-y-12">
      <h1 className="text-2xl font-semibold">Components</h1>

      <div className="grid gap-10 md:grid-cols-2">
        <ComponentExample title="Report Tabs">
          <ReportTabs />
        </ComponentExample>

        <ComponentExample title="Star Rating">
          <StarRating interactive />
        </ComponentExample>

        <ComponentExample title="Civil Report Card">
          <CivilReportCard />
        </ComponentExample>

        <ComponentExample title="SPPG Report Card">
          <SppgReportCard />
        </ComponentExample>
      </div>
    </main>
  );
}
