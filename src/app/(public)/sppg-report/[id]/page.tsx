import { sppgReportDetails } from "mock-data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NutritionalFacts } from "@/components/reports/nutritional-facts";

type SppgReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatPostedAt(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function SppgReportDetailPage({
  params,
}: SppgReportDetailPageProps) {
  const { id } = await params;
  const report = sppgReportDetails.find((item) => item.id === id);

  if (!report) {
    notFound();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="left">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image
            fill
            src={report.imageUrl}
            alt={report.title}
            className="object-cover"
          />
        </div>
      </div>
      <div className="right space-y-6">
        <div className="space-y-2">
          <p className="text-body-3 text-muted-foreground">
            {formatPostedAt(report.postedAt)} • {report.mealTime}
          </p>
          <h1 className="text-h2 font-semibold">{report.title}</h1>
          <p className="text-body-3">Oleh {report.author.sppgName}</p>
        </div>
        <NutritionalFacts facts={report.nutritionalFacts} />
        <p className="text-body-3">{report.content}</p>
      </div>
    </div>
  );
}
