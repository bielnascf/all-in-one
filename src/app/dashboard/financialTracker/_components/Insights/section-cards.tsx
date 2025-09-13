"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFinanceSummary } from "@/hooks/useFinances";
import {
  BanknoteIcon,
  ChartLineIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  DollarSignIcon,
  Loader2Icon,
} from "lucide-react";

export function SectionCards() {
  const { data: summary, isLoading, isError } = useFinanceSummary();

  if (isError) {
    return <p className="text-red-500">Failed to load summary</p>;
  }

  const renderValue = (value?: number, type?: "revenue" | "expenses" | "profit" | "toPay") => {
    if (isLoading) {
      return <Loader2Icon className="w-5 h-5 animate-spin text-zinc-400" />;
    }

    let colorClass = "text-white";

    switch (type) {
      case "revenue":
        if (value && value > 0) colorClass = "text-primary";
        break;
      case "expenses":
        if (value && value > 0) colorClass = "text-[#FF4D4F]";
        break;
      case "profit":
        if (value && value > 0) colorClass = "text-primary";
        else if (value && value < 0) colorClass = "text-[#FF4D4F]";
        break;
      case "toPay":
        colorClass = "text-yellow-500";
        break;
    }

    return (
      <p className={`text-base sm:text-lg font-normal ${colorClass}`}>
        ${value?.toLocaleString() || "0"}
      </p>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-zinc-200 select-none">
              Revenue
            </CardTitle>
            <div className="flex ml-auto text-primary">
              <ChevronsUpIcon className="w-4 h-4" />
              <DollarSignIcon className="w-4 h-4" />
            </div>
          </div>
          <CardDescription>Total revenue registered</CardDescription>
        </CardHeader>
        <CardContent>{renderValue(summary?.revenue, "revenue")}</CardContent>
      </Card>
      <Card className="shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-zinc-200 select-none">
              Expenses
            </CardTitle>
            <div className="flex ml-auto text-[#FF4D4F]">
              <ChevronsDownIcon className="w-4 h-4" />
              <DollarSignIcon className="w-4 h-4" />
            </div>
          </div>
          <CardDescription>Total expenses registered</CardDescription>
        </CardHeader>
        <CardContent>{renderValue(summary?.expenses, "expenses")}</CardContent>
      </Card>
      <Card className="shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-zinc-200 select-none">
              Profit
            </CardTitle>
            <div className="flex ml-auto">
              <ChartLineIcon className="w-4 h-4" />
            </div>
          </div>
          <CardDescription>Total profit registered</CardDescription>
        </CardHeader>
        <CardContent>{renderValue(summary?.profit, "profit")}</CardContent>
      </Card>
      <Card className="shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-zinc-200 select-none">
              To Pay
            </CardTitle>
            <div className="flex ml-auto text-yellow-500">
              <BanknoteIcon className="w-4 h-4" />
            </div>
          </div>
          <CardDescription>Bills pended will be up here</CardDescription>
        </CardHeader>
        <CardContent>
          {renderValue(summary?.toPay, "toPay")}
        </CardContent>
      </Card>
    </div>
  );
}
