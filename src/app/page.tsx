import { ComponentExample } from "@/components/component-example";
import { ReportTabs } from "@/components/report-tabs";
import StarRating from "@/components/star-rating";
import { CivilReportContainer } from "@/containers/civil-report-container";
import { SppgReportContainer } from "@/containers/sppg-report-container";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <h1 className="font-semibold text-2xl">Components</h1>

      <div className="grid gap-10 md:grid-cols-2">
        <ComponentExample title="Tabs">
          <ReportTabs />
        </ComponentExample>

        <ComponentExample title="Star Rating">
          <StarRating interactive />
        </ComponentExample>

        <ComponentExample title="Civil Report Card">
          <CivilReportContainer />
        </ComponentExample>

        <ComponentExample title="SPPG Report Card">
          <SppgReportContainer />
        </ComponentExample>
      </div>
    </main>
  );
}
