import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const finances = await prisma.finance.findMany({
      where: { userId: session.user.id },
    });

    const revenue = finances
      .filter((f) => f.category === "Income")
      .reduce((acc, f) => acc + Number(f.amount), 0);

    const expenses = finances
      .filter((f) => f.category === "Expense")
      .reduce((acc, f) => acc + Number(f.amount), 0);

    const profit = revenue - expenses;

    const toPay = finances
      .filter((f) => f.category === "Expense" && f.status === "Pending")
      .reduce((acc, f) => acc + Number(f.amount), 0);

    const topExpenses = finances
      .filter((f) => f.category === "Expense")
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .map((f) => ({
        title: f.title,
        type: f.type,
        amount: Number(f.amount),
        date: f.date.toISOString().split("T")[0],
      }));

    const topIncomes = finances
      .filter((f) => f.category === "Income")
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .map((f) => ({
        title: f.title,
        type: f.type,
        amount: Number(f.amount),
        date: f.date.toISOString().split("T")[0],
      }));

    const topExpenseTypes = Object.entries(
      finances
        .filter((f) => f.category === "Expense")
        .reduce(
          (acc, f) => {
            acc[f.type] = (acc[f.type] || 0) + Number(f.amount);
            return acc;
          },
          {} as Record<string, number>
        )
    )
      .sort(([, a], [, b]) => b - a)
      .map(([type, amount]) => ({ type, amount }));

    const topPending = finances
      .filter((f) => f.category === "Expense" && f.status === "Pending")
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .map((f) => ({
        title: f.title,
        type: f.type,
        amount: Number(f.amount),
        date: f.date.toISOString().split("T")[0],
      }));
    
      const recentIncomes = finances
      .filter((f) => f.category === "Income")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((f) => ({
        title: f.title,
        amount: Number(f.amount),
        date: f.date.toISOString().split("T")[0],
      }));

      const recentExpenses = finances
      .filter((f) => f.category === "Expense")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((f) => ({
        title: f.title,
        type: f.type,
        amount: Number(f.amount),
        date: f.date.toISOString().split("T")[0],
      }));

    return NextResponse.json({
      revenue,
      expenses,
      profit,
      toPay,
      topExpenses,
      topIncomes,
      topExpenseTypes,
      topPending,
      recentIncomes,
      recentExpenses,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
