import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/serverSession";

export async function GET() {
 try {
  const session = await getServerSession();

  if(!session || !session.user?.id) {
   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
   where: {
    userId: session.user.id,
   },
   orderBy: {
    createdAt: "desc",
   }
  });

  return NextResponse.json(tasks, { status: 200 });
 } catch (error) {
  return NextResponse.json({ error: "Internal Server Error: " + error }, { status: 500 });
 };
}

export async function POST(req: Request) {
 try {
  const session = await getServerSession();

  if(!session || !session.user.id) {
   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, category, color } = await req.json();

  if(!title || !category || !color) {
   return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newTask = await prisma.task.create({
   data: {
    title,
    description,
    category,
    color,
    userId: session.user.id,
   }
  });

  return NextResponse.json(newTask, { status: 201 });
 } catch(error) {
  return NextResponse.json({ error: "Internal Server Error: " + error }, { status: 500 });
 }
}
