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
import { useEffect, useState } from "react";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import api from "@/core/api/axios";
import type { VehicleServiceCountModel } from "../models/vehicle-service-count-model";

const chartConfig = {
  serviceCount: {
    label: "Servis Sayısı",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function VehicleServiceCountChart() {
  const [serviceCount, setServiceCount] = useState<VehicleServiceCountModel[]>(
    []
  );

  const getVehicleServiceCount = () => {
    api
      .get<ISingleResponse<VehicleServiceCountModel[]>>(
        `/reports/vehicle-service-count`
      )
      .then((res) => {
        return setServiceCount(res.data.data ?? []);
      })
      .catch((error) => {
        console.error("Error fetching totals:", error);
      });
  };

  useEffect(() => {
    getVehicleServiceCount();
  }, []);

  return (
    <Card className="w-full mb-20">
      <CardHeader>
        <CardTitle>Araçlara Göre Servis Hizmeti Sayısı</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[350px] w-[250px]">
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
              dataKey="title"
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
                dataKey="title"
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
            <div key={item.vehicleId} className="text-center p-1">
              <p className="text-muted-foreground">{item.title}</p>
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
