import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";

export async function DELETE(
  req: Request,
  { params }: { params: { batchId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { batchId } = params;

    if (!batchId) {
      return NextResponse.json(
        { error: "Batch ID is required" },
        { status: 400 }
      );
    }

    const batchToDelete = await prisma.aIGeneratedTasksBatch.findFirst({
      where: {
        id: batchId,
        userId: session.user.id,
      },
    });

    if (!batchToDelete) {
      return NextResponse.json(
        { error: "Batch not found or you don't have permission to delete it." },
        { status: 404 }
      );
    }

    await prisma.aIGeneratedTasksBatch.delete({
      where: { id: batchId },
    });

    return NextResponse.json(
      { success: true, message: "Batch deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[AI_BATCH_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}