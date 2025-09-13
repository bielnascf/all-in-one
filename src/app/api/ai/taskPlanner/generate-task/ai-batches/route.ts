import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";

const createBatchSchema = z.object({
  topic: z.string().min(1, "Topic is required."),
  tasks: z.array(
    z.object({
      title: z.string(),
      description: z.string().nullable(),
      category: z.string(),
      color: z.string(),
      completed: z.boolean(),
      createdAt: z.string().optional()
        .transform((val) => (val ? new Date(val) : new Date())),
      completedAt: z.string().nullable().optional()
        .transform((val) => (val ? new Date(val) : null)),
    })
  ).min(1, "Tasks are required."),
});


export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const batches = await prisma.aIGeneratedTasksBatch.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(batches);
  } catch (error) {
    console.error("[AI_BATCHES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validation = createBatchSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(validation.error.message, { status: 400 });
    }

    const { topic, tasks } = validation.data;

    const newBatch = await prisma.aIGeneratedTasksBatch.create({
      data: {
        topic,
        tasksJson: JSON.stringify(tasks),
        userId: session.user.id,
      },
    });

    return NextResponse.json(newBatch, { status: 201 });
  } catch (err) {
    console.error("[AI_BATCHES_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}