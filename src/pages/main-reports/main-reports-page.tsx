import { ChartPieBalance } from "@/features/main-report/components/chard-pie-balance";
import { EmployeeServiceCountChart } from "@/features/main-report/components/employee-service-count-chart";
import { HighestEarningChart } from "@/features/main-report/components/highest-earning-chard";
import { VehicleServiceCountChart } from "@/features/main-report/components/vehicle-service-count-chart";

export function MainReportPage() {
  return (
    <div className="w-full">
      <h3>Genel Durum Raporu</h3>
      <hr />
      <div className="hidden md:block rounded-md border mt-4">
        <div className="flex gap-4 items-center">
          <ChartPieBalance />
          <HighestEarningChart />
        </div>
        <div className="flex gap-4 items-center">
          <EmployeeServiceCountChart />
          <VehicleServiceCountChart />
        </div>
      </div>
      <div className="md:hidden mt-4">
        <div className="grid gap-4 items-center">
          <ChartPieBalance />
          <HighestEarningChart />
        </div>
        <div className="grid gap-4 items-center">
          <EmployeeServiceCountChart />
          <VehicleServiceCountChart />
        </div>
      </div>
    </div>
  );
}
