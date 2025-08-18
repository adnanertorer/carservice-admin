import { ChartPieBalance } from "@/features/main-report/components/chard-pie-balance";
import { EmployeeServiceCountChart } from "@/features/main-report/components/employee-service-count-chart";
import { HighestEarningChart } from "@/features/main-report/components/highest-earning-chard";
import { VehicleServiceCountChart } from "@/features/main-report/components/vehicle-service-count-chart";

export function MainReportPage() {
 
  return (
    <div className="w-full">
      <h3>Genel Durum Raporu</h3>
      <hr />
      <div className="flex gap-2 items-center">
        <ChartPieBalance />
        <HighestEarningChart />
      </div>
      <div className="flex gap-2 items-center">
        <EmployeeServiceCountChart />
        <VehicleServiceCountChart />
      </div>
    </div>
  );
}
