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
    <div className="space-y-6 md:space-y-8 pb-10">
      <h1 className="text-h2 font-bold mb-4 md:mb-8 border-b pb-4">
        Detail Laporan : {report.title}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr] items-start">
        <div className="left flex flex-col gap-6 w-full">
          <div className="relative w-full aspect-[16/9] lg:aspect-[2/1] overflow-hidden rounded-xl border border-border/10">
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

        <div className="right flex flex-col gap-6 w-full lg:sticky lg:top-8">
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
        "flex flex-col items-center justify-center p-3 rounded-lg border text-center aspect-[5/4] md:aspect-auto",
        className,
      )}
    >
      <p className="text-[10px] md:text-[11px] font-bold text-foreground/50 uppercase tracking-widest mb-1">
        {label}
      </p>
      <div className="flex flex-col items-center my-0.5">
        <p
          className="font-extrabold text-xl md:text-2xl leading-none"
          style={{ letterSpacing: "-0.03em" }}
        >
          {value}
        </p>
        <p className="text-[10px] font-semibold text-foreground/80 mt-1">
          {unit}
        </p>
      </div>
      <p className="text-[10px] font-semibold text-foreground/50 mt-1">
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
        "w-full border-2 border-foreground/10 shadow-none rounded-xl",
        className,
      )}
    >
      <CardHeader className="flex flex-row gap-3 items-center pb-4 pt-5">
        <GraphBoxIcon className="w-6 h-6 text-green-500" />
        <h2 className="text-h4 font-bold m-0">Kandungan Gizi Per Porsi</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
          <CaloriesNutritionFact nutritionFacts={nutritionalFacts} />
          <ProteinNutritionFact nutritionFacts={nutritionalFacts} />
          <CarbNutritionFact nutritionFacts={nutritionalFacts} />
          <FatNutritionFact nutritionFacts={nutritionalFacts} />
        </div>

        <div className="space-y-4 pt-2">
          <div className="h-3 rounded-full overflow-hidden relative w-full">
            <Progress segments={segments} className="h-full rounded-full" />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-foreground/70 justify-start">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  CALORIES_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Kalori</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  PROTEIN_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Protein</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  CARB_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Karbo</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
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
    <Card className="w-full border-2 border-foreground/10 shadow-none rounded-xl">
      <CardHeader className="flex flex-row items-center gap-3 pb-4 pt-6">
        <MoneyIcon className="w-6 h-6 text-green-500" />
        <h2 className="text-h4 m-0 font-bold">Transparansi Anggaran</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 w-full text-sm font-medium pb-6">
        <div className="flex flex-col gap-4">
          {budget.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-4 text-xs md:text-sm"
            >
              <span className="text-foreground/80 leading-relaxed">
                {item.name}
              </span>
              <span className="font-bold whitespace-nowrap">
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

        <div className="flex justify-between items-center text-sm md:text-base font-extrabold pb-0">
          <span>Total Harga Per Porsi</span>
          <span className="text-green-500 text-base md:text-lg">
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
    <Card className="w-full border-2 border-foreground/10 shadow-none overflow-hidden rounded-xl">
      <CardHeader className="bg-slate-50/50 border-b border-foreground/5 pb-3 pt-4">
        <h4 className="font-bold text-foreground/40 tracking-[0.2em] text-[11px] uppercase">
          INFORMASI VENDOR
        </h4>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex gap-4 items-center mb-1">
          <div className="w-12 h-12 rounded-xl bg-green-50/80 flex items-center justify-center flex-shrink-0">
            <ShopIcon className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base md:text-lg leading-tight">
              {vendor.sppgName}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              Vendor Terakreditasi B
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 text-xs font-medium text-foreground/70 mt-2">
          <div className="flex items-center gap-3">
            <PeopleIcon className="w-4 h-4 flex-shrink-0 text-foreground/40" />
            <span>Kepemilikan : Perseorangan</span>
          </div>
          <div className="flex items-start gap-3">
            <LocationIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-foreground/40" />
            <span className="leading-snug">{vendor.address}</span>
          </div>
        </div>

        <div className="relative w-full aspect-[2/1] bg-slate-100 rounded-lg overflow-hidden mt-3 border border-foreground/5">
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
    <div className="flex flex-col gap-3 mt-2">
      <h3 className="font-bold text-base mb-1">Laporan Terkait</h3>
      {reports.map((r) => (
        <Card
          key={r.id}
          className="w-full border-2 border-foreground/10 shadow-none hover:border-foreground/20 hover:bg-slate-50/50 transition-colors p-3.5 rounded-xl cursor-pointer"
        >
          <div className="flex gap-4 items-center h-full">
            <div className="relative w-[70px] h-[70px] rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-border/5">
              <Image
                src={r.imageUrl}
                alt={r.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col w-full h-full justify-center">
              <div className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-1">
                {r.mealTime}
              </div>
              <div className="font-bold text-sm leading-tight text-foreground line-clamp-1 mb-1">
                {r.title}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
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
    <Card className="w-full bg-[#0a0a0a] text-white p-6 shadow-none flex flex-col items-center text-center gap-4 border-0 rounded-xl mt-2 mb-2">
      <div className="text-green-500 mt-2">
        <SpeakerIcon className="w-8 h-8" />
      </div>
      <div className="space-y-1.5 mb-2">
        <h3 className="font-bold text-base leading-tight">
          Temukan Ketidaksesuaian?
        </h3>
        <p className="text-[11px] text-zinc-400 font-medium px-2 leading-relaxed">
          Laporkan jika gizi atau porsi tidak sesuai dengan yang tertera di
          platform ini
        </p>
      </div>
      <Button className="w-full bg-white text-black hover:bg-zinc-200 font-extrabold max-w-[200px] h-10 rounded-lg text-sm">
        Laporkan
      </Button>
    </Card>
  );
}
