import { cn } from "@/lib/utils";
import type { TNutritionalFacts } from "@/types";

export interface NutritionalFactsProps {
  facts: TNutritionalFacts;
}

export interface NutritionalFactItemProps {
  label: string;
  value: number;
  unit: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function NutritionalFactItem({
  label,
  value,
  unit,
  className,
  labelClassName,
  valueClassName,
}: NutritionalFactItemProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-0 bg-muted px-2 py-2 text-center",
        className,
      )}
    >
      <p
        className={cn(
          "text-body-3 text-foreground/30 uppercase",
          labelClassName,
        )}
      >
        {label}
      </p>
      <p className={cn("font-black text-body-3 lg:text-h4", valueClassName)}>
        {value} {unit}
      </p>
    </div>
  );
}

export function NutritionalFacts({ facts }: NutritionalFactsProps) {
  return (
    <div className="@container my-2 w-full">
      <div className="grid @[300px]:grid-cols-4 grid-cols-2 gap-2 rounded-lg">
        <NutritionalFactItem
          label="Kalori"
          value={facts.calories.inKcal}
          unit="kkal"
        />
        <NutritionalFactItem
          label="Protein"
          value={facts.proteinGrams.inGrams}
          unit="gram"
        />
        <NutritionalFactItem
          label="Karbo"
          value={facts.carbGrams.inGrams}
          unit="gram"
        />
        <NutritionalFactItem
          label="Lemak"
          value={facts.fatGrams.inGrams}
          unit="gram"
        />
      </div>
    </div>
  );
}
