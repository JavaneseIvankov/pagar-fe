import type { TNutritionalFact } from "@/types";

export interface NutritionalFactsProps {
  facts: TNutritionalFact[];
}

export function NutritionalFacts({ facts }: NutritionalFactsProps) {
  return (
    <div className="@container my-2 w-full">
      <div className="grid @[300px]:grid-cols-4 grid-cols-2 gap-2 rounded-lg">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border-0 bg-muted px-2 py-2 text-center"
          >
            <p className="text-foreground/30 text-body-3 uppercase">
              {fact.label}
            </p>
            <p className="font-black text-body-3 lg:text-h4">
              {fact.value} {fact.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
