"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import type { EmployeeServiceCountModel } from "../models/employee-service-count-model";
import { useEffect, useState } from "react";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import api from "@/core/api/axios";

const chartConfig = {
  serviceCount: {
    label: "Servis Sayısı",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function EmployeeServiceCountChart() {
  const [serviceCount, setServiceCount] = useState<EmployeeServiceCountModel[]>(
    []
  );

  const getEmployeeServiceCount = () => {
    api
      .get<ISingleResponse<EmployeeServiceCountModel[]>>(
        `/reports/employee-service-count`
      )
      .then((res) => {
        return setServiceCount(res.data.data ?? []);
      })
      .catch((error) => {
        console.error("Error fetching totals:", error);
      });
  };

  useEffect(() => {
    getEmployeeServiceCount();
  }, []);

  return (
    <Card className="w-full mb-20">
      <CardHeader>
        <CardTitle>Personele Göre Servis Hizmeti Sayısı</CardTitle>
      </CardHeader>
      <CardContent className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[350px] w-[250px]">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={serviceCount}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="employeeName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="serviceCount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="serviceCount"
              layout="vertical"
              fill="var(--color-serviceCount)"
              radius={4}
            >
              <LabelList
                dataKey="employeeName"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="serviceCount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex-col items-center gap-2 leading-none font-medium">
          {serviceCount.map((item) => (
            <div key={item.employeeId} className="text-center p-1">
              <p className="text-muted-foreground">{item.employeeName}</p>
              <p className="font-medium text-green-600 p-1">
                Toplam Servis İşlemi : {item.serviceCount}
              </p>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
