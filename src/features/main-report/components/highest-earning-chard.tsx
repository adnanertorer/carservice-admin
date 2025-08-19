"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import type { HighestEarningModel } from "../models/highest-earning-model";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { formatCurrency } from "@/core/components/tools/stringOps";

const chartConfig = {
  totalClaim: {
    label: "Toplam Ödenen",
    color: "var(--chart-2)",
  },
  totalDebt: {
    label: "Toplam Borç",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function HighestEarningChart() {
  const [highestEarning, setHighestEarning] = useState<HighestEarningModel[]>(
    []
  );

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
    getHighestEarningCustomers();
  }, []);

  return (
    <Card className="w-full mb-20">
      <CardHeader>
        <CardTitle>
          En Çok İşlem Yaptıran Müşterilerin Finansal Durum Raporu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[350px] w-[250px]">
          <BarChart accessibilityLayer data={highestEarning}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="customerName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="totalClaim"
              stackId="a"
              fill="var(--color-totalClaim)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="totalDebt"
              stackId="a"
              fill="var(--color-totalDebt)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex-col items-center gap-2 leading-none font-medium">
          {highestEarning.map((item) => (
            <div key={item.customerId} className="text-center p-1">
              <p className="text-muted-foreground">
                {item.customerName} {item.customerSurname}
              </p>
              <p className="font-medium text-green-600 p-1">
                Toplam Tahsilat : {formatCurrency(item.totalClaim)}
              </p>
              <p className="font-medium text-green-600 p-1">
                Toplam Borç : {formatCurrency(item.totalDebt)}
              </p>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
