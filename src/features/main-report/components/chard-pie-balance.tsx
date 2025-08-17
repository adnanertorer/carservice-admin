"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/core/components/tools/stringOps";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { useEffect, useState } from "react";
import type { TransactionReportModel } from "../models/tansaction-report-model";
import type { HighestEarningModel } from "../models/highest-earning-model";

const chartConfig = {
  amount: {
    label: "Tutar",
  },
  "0": {
    label: "Toplam Alacak",
    color: "var(--chart-1)",
  },
  "1": {
    label: "Toplam Tahsilat",
    color: "var(--chart-2)",
  },
  "Balance": {
    label: "Kalan Alacak",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartPieBalance() {
  const [totals, setTotals] = useState<TransactionReportModel[]>([]);
  const [highestEarning, setHighestEarning] = useState<HighestEarningModel[]>([]);

  console.log(totals);

  const getTotalTransaction = () => {
    api
      .get<ISingleResponse<TransactionReportModel[]>>(`/reports/transactions`)
      .then((res) => {
        return setTotals(res.data.data ?? []);
      })
      .catch((error) => {
        console.error("Error fetching totals:", error);
      });
  };

  const getHighestEarningCustomers = () => {
    api
      .get<ISingleResponse<HighestEarningModel[]>>(`/reports/highest-earning`)
      .then((res) => {
        return setHighestEarning(res.data.data ?? []);
      })
      .catch((error) => {
        console.error("Error fetching totals:", error);
      });
  };

  useEffect(() => {
    getTotalTransaction();
    getHighestEarningCustomers();
  }, []);

  return (
    <div className="flex items-center p-2">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Genel Finansal Durum</CardTitle>
        </CardHeader>
        <CardContent className="flex-2 pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] w-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={totals}
                dataKey="amount"
                label
                nameKey="transactionTypeId"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex-col items-center gap-2 leading-none font-medium">{
            totals.map((item) => (
              <div key={item.transactionTypeId} className="text-center p-1">
                <p className="text-muted-foreground">{item.transactionTypeName}</p>
                <p className="font-medium text-green-600 p-1">
                  {formatCurrency(item.amount)}
                </p>
              </div>
            ))
            }
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
