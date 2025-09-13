import { Task } from "@/interfaces/ITaskPlanner";

async function handle<T>(res: Response): Promise<T> {
 if(!res.ok) {
  const msg = await res.text().catch(() => res.statusText);
  throw new Error(msg || "Request failed");
 }

 return res.json();
}

export async function apiGetTasks(): Promise<Task[]> {
 const res = await fetch("/api/taskPlanner", { cache: "no-store" });

 return handle<Task[]>(res);
}

type CreateTask = Pick<Task, "title" | "description" | "category" | "color">;

export async function apiCreateTask(data: CreateTask): Promise<Task> {
 const res = await fetch("/api/taskPlanner", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 return handle<Task>(res);
}

export async function apiUpdateTask(taskId: string, data: Partial<Task>): Promise<Task> {
 const res = await fetch(`/api/taskPlanner/${taskId}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 return handle<Task>(res);
}

export async function apiDeleteTask(id: string): Promise<{message: string}> {
 const res = await fetch(`/api/taskPlanner/${id}`, { method: "DELETE" });

 return handle<{ message: string}>(res);
}