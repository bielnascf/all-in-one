// app/api/finances/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const financeId  = params.id;

    const finance = await prisma.finance.findUnique({
      where: { id: financeId },
    });

    if (!finance || finance.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.finance.delete({ where: { id: financeId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" + error }, { status: 400 });
  }
}