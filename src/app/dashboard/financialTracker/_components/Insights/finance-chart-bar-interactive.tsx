"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useFinanceSummary } from "@/hooks/useFinances";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3EAC91",
  },
  expenses: {
    label: "Expenses",
    color: "#FF4D4F",
  },
  profit: {
    label: "Profit",
    color: "#858585",
  },
} satisfies ChartConfig;

export function FinanceChartBarInteractive() {
  const { data, isLoading, error } = useFinanceSummary();

  if (isLoading) return <p className="text-zinc-500">Loading content...</p>;
  if (error || !data) return <p>Erro ao carregar dados</p>;

  const grouped: Record<string, { revenue: number; expenses: number }> = {};

  data.recentIncomes.forEach((i) => {
    if (!grouped[i.date]) grouped[i.date] = { revenue: 0, expenses: 0 };
    grouped[i.date].revenue += i.amount;
  });

  data.recentExpenses.forEach((e) => {
    if (!grouped[e.date]) grouped[e.date] = { revenue: 0, expenses: 0 };
    grouped[e.date].expenses += e.amount;
  });

  const chartData = Object.entries(grouped)
    .map(([date, { revenue, expenses }]) => ({
      date,
      revenue,
      expenses,
      profit: revenue - expenses,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Card className="py-0">
      <CardHeader>
        <CardTitle>Finance Overview</CardTitle>
        <CardDescription>
          Comparing Revenue, Expenses and Profit over time
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
            barSize={20}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [year, month, day] = value.split("-");
                const dateFormatted = `${day}/${month}/${year}`;
                
                return dateFormatted;
              }}
            />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Legend />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={6} />
            <Bar dataKey="profit" fill="var(--color-profit)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
