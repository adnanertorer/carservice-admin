import { ChartPieBalance } from "@/features/main-report/components/chard-pie-balance";

export function MainReportPage() {
 
  return (
    <div className="w-full">
      <h3>Genel Durum Raporu</h3>
      <hr />
      <ChartPieBalance />
    </div>
  );
}
