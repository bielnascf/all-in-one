import { protectRoute } from "@/lib/serverSession";
import { SectionCards } from "./_components/Insights/section-cards";
import { FinanceChartBarInteractive } from "./_components/Insights/finance-chart-bar-interactive";
import FinancesTableClient from "./_components/FinanceTableClient";
import { RankingCarousel } from "./_components/Insights/ranking-carousel";

export default async function FinancialTracker() {
  await protectRoute();

  return (
    <main className="sm:ml-14 py-4 px-8">
      <div className="border-b border-primary pb-2 mb-2">
        <h1 className="text-xl font-bold">Financial Tracker</h1>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="flex sm:gap-8 gap-4">
              <div className="flex-1">
                <FinanceChartBarInteractive />
              </div>
              <div>
                <RankingCarousel />
              </div>
            </div>
            <FinancesTableClient />
          </div>
        </div>
      </div>
    </main>
  );
}
