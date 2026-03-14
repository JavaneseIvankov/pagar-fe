import type { ReactNode } from "react";

export function ComponentExample({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-medium text-muted-foreground text-sm">{title}</h2>

      <div className="flex items-center justify-center rounded-lg border bg-background p-8">
        {children}
      </div>
    </div>
  );
}
