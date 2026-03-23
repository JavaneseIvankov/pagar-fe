import Image from "next/image";
import { notFound } from "next/navigation";
import {
  GraphBoxIcon,
  LocationIcon,
  MoneyIcon,
  PeopleIcon,
  ShopIcon,
  SpeakerIcon,
} from "@/components/exported-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/multi-segment-progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { sppgReportDetails } from "@/mock-data";
import type { TBudget, TNutritionalFacts, TSppgReport } from "@/types";

type SppgReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SppgReportDetailPage({
  params,
}: SppgReportDetailPageProps) {
  const { id } = await params;
  const report = sppgReportDetails.find((item) => item.id === id);

  if (!report) {
    notFound();
  }

  return (
    <div className="space-y-6 pb-10 md:space-y-8">
      <h1 className="mb-4 border-b pb-4 font-bold text-h2 md:mb-8">
        Detail Laporan : {report.title}
      </h1>

      <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="left flex w-full flex-col gap-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/10 lg:aspect-[2/1]">
            <Image
              fill
              src={report.imageUrl}
              alt={report.title}
              className="object-cover"
            />
          </div>

          <NutritionalFactsCard nutritionalFacts={report.nutritionalFacts} />

          {report.budget && <BudgetTransparencyCard budget={report.budget} />}
        </div>

        <div className="right flex w-full flex-col gap-6 lg:sticky lg:top-8">
          <VendorInfoCard vendor={report.author} />
          <RelatedReports reports={report.relatedReports} />
          <DiscrepancyCard />
        </div>
      </div>
    </div>
  );
}

const CALORIES_FILL_CLASS = "bg-[#4ade80]";
const PROTEIN_FILL_CLASS = "bg-[#38bdf8]";
const CARB_FILL_CLASS = "bg-[#fb923c]";
const FAT_FILL_CLASS = "bg-[#a855f7]";

interface NutritionFactTileProps {
  label: string;
  value: number;
  unit: string;
  dciPercent: number;
  className?: string;
}

function NutritionFactTile({
  label,
  value,
  unit,
  dciPercent,
  className,
}: NutritionFactTileProps) {
  return (
    <div
      className={cn(
        "flex aspect-[5/4] flex-col items-center justify-center rounded-lg border p-3 text-center md:aspect-auto",
        className,
      )}
    >
      <p className="mb-1 font-bold text-[10px] text-foreground/50 uppercase tracking-widest md:text-[11px]">
        {label}
      </p>
      <div className="my-0.5 flex flex-col items-center">
        <p
          className="font-extrabold text-xl leading-none md:text-2xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {value}
        </p>
        <p className="mt-1 font-semibold text-[10px] text-foreground/80">
          {unit}
        </p>
      </div>
      <p className="mt-1 font-semibold text-[10px] text-foreground/50">
        {dciPercent}%
      </p>
    </div>
  );
}

function CaloriesNutritionFact({
  nutritionFacts,
}: {
  nutritionFacts: TNutritionalFacts;
}) {
  return (
    <NutritionFactTile
      label="Kalori"
      value={nutritionFacts.calories.inKcal}
      unit="kkal"
      dciPercent={nutritionFacts.calories.inDciPercent}
      className="border-[#4ade80] bg-[#4ade80]/10"
    />
  );
}

function ProteinNutritionFact({
  nutritionFacts,
}: {
  nutritionFacts: TNutritionalFacts;
}) {
  return (
    <NutritionFactTile
      label="Protein"
      value={nutritionFacts.proteinGrams.inGrams}
      unit="gram"
      dciPercent={nutritionFacts.proteinGrams.inDciPercent}
      className="border-[#38bdf8] bg-[#38bdf8]/10"
    />
  );
}

function CarbNutritionFact({
  nutritionFacts,
}: {
  nutritionFacts: TNutritionalFacts;
}) {
  return (
    <NutritionFactTile
      label="Karbo"
      value={nutritionFacts.carbGrams.inGrams}
      unit="gram"
      dciPercent={nutritionFacts.carbGrams.inDciPercent}
      className="border-[#fb923c] bg-[#fb923c]/10"
    />
  );
}

function FatNutritionFact({
  nutritionFacts,
}: {
  nutritionFacts: TNutritionalFacts;
}) {
  return (
    <NutritionFactTile
      label="Lemak"
      value={nutritionFacts.fatGrams.inGrams}
      unit="gram"
      dciPercent={nutritionFacts.fatGrams.inDciPercent}
      className="border-[#a855f7] bg-[#a855f7]/10"
    />
  );
}

function NutritionalFactsCard({
  nutritionalFacts,
  className,
}: {
  nutritionalFacts: TNutritionalFacts;
  className?: string;
}) {
  const calorieDci = nutritionalFacts.calories.inDciPercent;
  const proteinDci = nutritionalFacts.proteinGrams.inDciPercent;
  const carbDci = nutritionalFacts.carbGrams.inDciPercent;
  const fatDci = nutritionalFacts.fatGrams.inDciPercent;
  const totalDci = calorieDci + proteinDci + carbDci + fatDci || 1;
  let runningPercent = 0;
  const segments = [
    {
      dciPercent: calorieDci,
      color: CALORIES_FILL_CLASS,
    },
    {
      dciPercent: proteinDci,
      color: PROTEIN_FILL_CLASS,
    },
    {
      dciPercent: carbDci,
      color: CARB_FILL_CLASS,
    },
    {
      dciPercent: fatDci,
      color: FAT_FILL_CLASS,
    },
  ].map((segment) => {
    const proportion = (segment.dciPercent / totalDci) * 100;
    runningPercent += proportion;
    return {
      value: runningPercent,
      color: segment.color,
    };
  });

  return (
    <Card
      className={cn(
        "w-full rounded-xl border-2 border-foreground/10 shadow-none",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center gap-3 pt-5 pb-4">
        <GraphBoxIcon className="h-6 w-6 text-green-500" />
        <h2 className="m-0 font-bold text-h4">Kandungan Gizi Per Porsi</h2>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-6">
        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
          <CaloriesNutritionFact nutritionFacts={nutritionalFacts} />
          <ProteinNutritionFact nutritionFacts={nutritionalFacts} />
          <CarbNutritionFact nutritionFacts={nutritionalFacts} />
          <FatNutritionFact nutritionFacts={nutritionalFacts} />
        </div>

        <div className="space-y-4 pt-2">
          <div className="relative h-3 w-full overflow-hidden rounded-full">
            <Progress segments={segments} className="h-full rounded-full" />
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4 font-semibold text-foreground/70 text-xs">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  CALORIES_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Kalori</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  PROTEIN_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Protein</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  CARB_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Karbo</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  FAT_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Lemak</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BudgetTransparencyCard({ budget }: { budget: TBudget }) {
  if (!budget) return null;
  return (
    <Card className="w-full rounded-xl border-2 border-foreground/10 shadow-none">
      <CardHeader className="flex flex-row items-center gap-3 pt-6 pb-4">
        <MoneyIcon className="h-6 w-6 text-green-500" />
        <h2 className="m-0 font-bold text-h4">Transparansi Anggaran</h2>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-6 pb-6 font-medium text-sm">
        <div className="flex flex-col gap-4">
          {budget.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 text-xs md:text-sm"
            >
              <span className="text-foreground/80 leading-relaxed">
                {item.name}
              </span>
              <span className="whitespace-nowrap font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(item.price)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="border-foreground/10" />

        <div className="flex items-center justify-between pb-0 font-extrabold text-sm md:text-base">
          <span>Total Harga Per Porsi</span>
          <span className="text-base text-green-500 md:text-lg">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(budget.totalPrice)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function VendorInfoCard({ vendor }: { vendor: TSppgReport["author"] }) {
  return (
    <Card className="w-full overflow-hidden rounded-xl border-2 border-foreground/10 shadow-none">
      <CardHeader className="border-foreground/5 border-b bg-slate-50/50 pt-4 pb-3">
        <h4 className="font-bold text-[11px] text-foreground/40 uppercase tracking-[0.2em]">
          INFORMASI VENDOR
        </h4>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="mb-1 flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50/80">
            <ShopIcon className="h-6 w-6 text-foreground" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base leading-tight md:text-lg">
              {vendor.sppgName}
            </h3>
            <p className="mt-1 font-medium text-[11px] text-muted-foreground">
              Vendor Terakreditasi B
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2.5 font-medium text-foreground/70 text-xs">
          <div className="flex items-center gap-3">
            <PeopleIcon className="h-4 w-4 flex-shrink-0 text-foreground/40" />
            <span>Kepemilikan : Perseorangan</span>
          </div>
          <div className="flex items-start gap-3">
            <LocationIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/40" />
            <span className="leading-snug">{vendor.address}</span>
          </div>
        </div>

        <div className="relative mt-3 aspect-[2/1] w-full overflow-hidden rounded-lg border border-foreground/5 bg-slate-100">
          <Image
            src="https://placehold.co/600x300?text=Map+Placeholder&font=roboto"
            alt="Peta Lokasi"
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function RelatedReports({ reports }: { reports?: TSppgReport[] }) {
  if (!reports || reports.length === 0) return null;
  return (
    <div className="mt-2 flex flex-col gap-3">
      <h3 className="mb-1 font-bold text-base">Laporan Terkait</h3>
      {reports.map((r) => (
        <Card
          key={r.id}
          className="w-full cursor-pointer rounded-xl border-2 border-foreground/10 p-3.5 shadow-none transition-colors hover:border-foreground/20 hover:bg-slate-50/50"
        >
          <div className="flex h-full items-center gap-4">
            <div className="relative h-[70px] w-[70px] flex-shrink-0 overflow-hidden rounded-lg border border-border/5 bg-slate-100">
              <Image
                src={r.imageUrl}
                alt={r.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex h-full w-full flex-col justify-center">
              <div className="mb-1 font-bold text-[10px] text-green-500 uppercase tracking-wider">
                {r.mealTime}
              </div>
              <div className="mb-1 line-clamp-1 font-bold text-foreground text-sm leading-tight">
                {r.title}
              </div>
              <div className="font-medium text-muted-foreground text-xs">
                Rp 15.000
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function DiscrepancyCard() {
  return (
    <Card className="mt-2 mb-2 flex w-full flex-col items-center gap-4 rounded-xl border-0 bg-[#0a0a0a] p-6 text-center text-white shadow-none">
      <div className="mt-2 text-green-500">
        <SpeakerIcon className="h-8 w-8" />
      </div>
      <div className="mb-2 space-y-1.5">
        <h3 className="font-bold text-base leading-tight">
          Temukan Ketidaksesuaian?
        </h3>
        <p className="px-2 font-medium text-[11px] text-zinc-400 leading-relaxed">
          Laporkan jika gizi atau porsi tidak sesuai dengan yang tertera di
          platform ini
        </p>
      </div>
      <Button className="h-10 w-full max-w-[200px] rounded-lg bg-white font-extrabold text-black text-sm hover:bg-zinc-200">
        Laporkan
      </Button>
    </Card>
  );
}
