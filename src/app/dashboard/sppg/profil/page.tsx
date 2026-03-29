import { SppgProfileContainer } from "@/containers/sppg-profile-container";

export default function DashboardSppgProfilePage() {
  return (
    <div className="flex w-full flex-1 flex-col bg-muted/20">
      <div className="mx-auto w-full max-w-[1200px]">
        <SppgProfileContainer />
      </div>
    </div>
  );
}
