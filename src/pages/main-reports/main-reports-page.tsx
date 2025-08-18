import { ChartPieBalance } from "@/features/main-report/components/chard-pie-balance";
import { HighestEarningChart } from "@/features/main-report/components/highest-earning-chard";

export function MainReportPage() {
 
  return (
    <div className="w-full">
      <h3>Genel Durum Raporu</h3>
      <hr />
      <div className="flex gap-4 items-center">
        <ChartPieBalance />
        <HighestEarningChart />
      </div>
    </div>
  );
}
