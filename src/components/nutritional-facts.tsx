export interface NutritionalFact {
  label: string;
  value: string | number;
}

export interface NutritionalFactsProps {
  facts: NutritionalFact[];
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
            <p className="text-foreground/30 text-xs uppercase">{fact.label}</p>
            <p className="font-black text-sm lg:text-md">{fact.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
