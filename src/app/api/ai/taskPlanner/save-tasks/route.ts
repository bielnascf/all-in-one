// app/api/ai/task/save-tasks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tasks, batchId } = await req.json();

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return new NextResponse("Tasks array is required", { status: 400 });
    }

    await prisma.task.createMany({
      data: tasks.map((task) => ({
        title: task.title,
        description: task.description || "",
        category: task.category,
        color: task.color,
        completed: false,
        userId: session.user.id,
      })),
    });

    if (batchId) {
      await prisma.aIGeneratedTasksBatch.delete({
        where: { id: batchId },
      });
    }

    return NextResponse.json({ message: "Tasks saved successfully" });
  } catch (error) {
    console.error("[AI_SAVE_TASKS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
