import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
 try {
  const session = await getServerSession();

  if(!session || !session.user?.id) {
   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskId = params.id;

  const { completed } = await req.json();

  const task = await prisma.task.findUnique({
   where: { id: taskId }, 
  });

  if(!task || task.userId !== session.user.id) {
   return NextResponse.json({ error: "Task not found or access denied" }, { status: 404 });
  }

  const updatedTask = await prisma.task.update({
   where: { id: taskId },
   data: {
    completed,
    completedAt: completed ? new Date() : null,
   }  
  });

  return NextResponse.json(updatedTask, { status: 200 });
 } catch(error) {
  return NextResponse.json({ error: "Internal Server Error: " + error }, { status: 500 });
 }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
 try {
  const session = await getServerSession();

  if(!session || !session.user?.id) {
   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskId = params.id;

  const task = await prisma.task.findUnique({
   where: { id: taskId },
  });

  if(!task || task.userId !== session.user.id) {
   return NextResponse.json({ error: "Task not found or access denied" }, { status: 404 });
  }

  await prisma.task.delete({
   where: { id: taskId },
  });

  return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
 } catch(error) {
  return NextResponse.json({ error: "Internal Server Error: " + error }, { status: 500 });
 }
}