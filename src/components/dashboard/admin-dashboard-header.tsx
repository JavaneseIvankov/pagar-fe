export interface AdminDashboardHeaderProps {
  title: string;
  description: string;
}

export function AdminDashboardHeader({
  title,
  description,
}: AdminDashboardHeaderProps) {
  return (
    <div>
      <h1 className="font-bold text-3xl tracking-tight">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
