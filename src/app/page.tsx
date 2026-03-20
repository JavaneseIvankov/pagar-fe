import { AppHeader } from "@/components/app-header";
import { ComponentExample } from "@/components/component-example";
import { ReportTabs } from "@/components/report-tabs";
import { SearchInput } from "@/components/search-input";
import StarRating from "@/components/star-rating";
import { PublicReportContainer } from "@/containers/public-report-container";
import { SppgReportContainer } from "@/containers/sppg-report-container";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <h1 className="text-h1">Components</h1>
      <ComponentExample title="App Header">
        <AppHeader />
      </ComponentExample>
      <div className="grid gap-10 md:grid-cols-2">
        <ComponentExample title="Search Input">
          <SearchInput />
        </ComponentExample>

        <ComponentExample title="Tabs">
          <ReportTabs />
        </ComponentExample>

        <ComponentExample title="Star Rating">
          <StarRating interactive />
        </ComponentExample>

        <ComponentExample title="Civil Report Card">
          <PublicReportContainer />
        </ComponentExample>

        <ComponentExample title="SPPG Report Card">
          <SppgReportContainer />
        </ComponentExample>
      </div>
    </main>
  );
}
