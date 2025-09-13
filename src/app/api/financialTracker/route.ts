import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";
import { financeSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const finances = await prisma.finance.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const serialized = finances.map((f) => ({
      ...f,
      date: f.date.toISOString().split("T")[0],
      amount: Number(f.amount),
    }));

    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  try {
    const body = await req.json();
    const data = financeSchema.parse(body);

    const today = new Date();
    const dateString = today.toISOString().split("T")[0];

    const finance = await prisma.finance.create({
      data: {
        ...data,
        date: new Date(dateString),
        createdAt: new Date(dateString),
        userId: session.user.id,
      },
    });

    const financeJson = {
      ...finance,
      amount: Number(finance.amount),
    };

    return NextResponse.json(financeJson, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
