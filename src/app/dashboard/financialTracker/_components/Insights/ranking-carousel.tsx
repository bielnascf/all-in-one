"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFinanceSummary } from "@/hooks/useFinances";
import { CircleOffIcon, FlagIcon, Loader2Icon } from "lucide-react";

export function RankingCarousel() {
  const { data, isLoading } = useFinanceSummary();

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    const dateFormatted = `${day}/${month}/${year}`;

    return dateFormatted;
  }

  return (
    <Card className="shadow-2xl w-[350px]">
      <CardHeader>
        <CardTitle className="flex gap-1 items-center text-lg sm:text-xl">
          <FlagIcon className="w-4 h-4" />
          Rankings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2Icon className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Carousel>
            <CarouselContent>
              {data?.revenue || data?.expenses ? (
                <>
                  <CarouselItem>
                    <div>
                      <h3 className="font-semibold mb-2">Top 5 Expenses</h3>
                      <ul className="space-y-1 text-sm">
                        {data?.topExpenses?.map((f, i) => (
                          <li
                            key={i}
                            className="flex flex-col border-b border-muted-foreground/20 pb-1"
                          >
                            <div className="flex justify-between">
                              <span>
                                {i + 1}. {f.title}{" "}
                                <span className="text-xs text-muted-foreground">
                                  ({f.type})
                                </span>
                              </span>
                              <span className="text-[#FF4D4F] font-medium">
                                -${f.amount.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(f.date)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div>
                      <h3 className="font-semibold mb-2">Top 5 Incomes</h3>
                      <ul className="space-y-1 text-sm">
                        {data?.topIncomes?.map((f, i) => (
                          <li
                            key={i}
                            className="flex flex-col border-b border-muted-foreground/20 pb-1"
                          >
                            <div className="flex justify-between">
                              <span>
                                {i + 1}. {f.title}
                              </span>
                              <span className="text-primary font-medium">
                                +${f.amount.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(f.date)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div>
                      <h3 className="font-semibold mb-2">Top Expense Types</h3>
                      <ul className="space-y-1 text-sm">
                        {data?.topExpenseTypes?.slice(0, 5).map((f, i) => (
                          <li
                            key={i}
                            className="flex justify-between border-b border-muted-foreground/20 pb-1"
                          >
                            <span>
                              {i + 1}. {f.type}
                            </span>
                            <span className="text-red-500 font-medium">
                              -${f.amount.toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Top Pending Expenses
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {data?.topPending?.slice(0, 5).map((f, i) => (
                          <li
                            key={i}
                            className="flex flex-col border-b border-muted-foreground/20 pb-1"
                          >
                            <div className="flex justify-between">
                              <span>
                                {i + 1}. {f.title}
                              </span>
                              <span className="text-yellow-500 font-medium">
                                -${f.amount.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(f.date)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div>
                      <h3 className="font-semibold mb-2">Recent Expenses</h3>
                      <ul className="space-y-1 text-sm">
                        {data?.recentExpenses?.slice(0, 5).map((f, i) => (
                          <li
                            key={i}
                            className="flex flex-col border-b border-muted-foreground/20 pb-1"
                          >
                            <div className="flex justify-between">
                              <span>
                                {i + 1}. {f.title}
                              </span>
                              <span className="text-[#FF4D4F] font-medium">
                                -${f.amount.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(f.date)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div>
                      <h3 className="font-semibold mb-2">Recent Incomes</h3>
                      <ul className="space-y-1 text-sm">
                        {data?.recentIncomes?.slice(0, 5).map((f, i) => (
                          <li
                            key={i}
                            className="flex flex-col border-b border-muted-foreground/20 pb-1"
                          >
                            <div className="flex justify-between">
                              <span>
                                {i + 1}. {f.title}
                              </span>
                              <span className="text-primary font-medium">
                                +${f.amount.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(f.date)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CarouselItem>
                </>
              ) : (
                <div className="text-zinc-500 flex gap-1 items-center justify-center w-full">
                  <CircleOffIcon className="w-4 h-4" />
                  Nothing registered yet
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
}
