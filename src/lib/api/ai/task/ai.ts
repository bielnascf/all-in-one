import { Task } from "@/interfaces/ITasks";

function getRandomColor() {
  const colors = ["#720909", "#183514", "#45297E", "#5c2900"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export async function generateTasks(topic: string): Promise<Task[]> {
  try {
    const response = await fetch("/api/ai/task/generate-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate tasks");
    }

    const data = await response.json();

    return data.suggestions.map((task: Task, i: number) => ({
      ...task,
      id: String(i),
      completed: false,
      color: getRandomColor(),
    }));
  } catch (err) {
    console.log("Error calling the generate tasks API: ", err);
    throw err;
  }
}

export interface GeneratedBatch {
  id: string;
  topic: string;
  tasks: Task[];
  createdAt: string;
}

export const getAIBatches = async (): Promise<GeneratedBatch[]> => {
  const response = await fetch("/api/ai/task/generate-task/ai-batches");

  if (!response.ok) {
    throw new Error("Failed to fetch AI generated batches.");
  }

  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((batch: any) => ({
    ...batch,
    tasks: JSON.parse(batch.tasksJson),
  }));
};

export interface CreateSaveAIBatch {
  id: string;
  topic: string;
  tasks: Task[];
  createdAt: string;
}

export const saveAIBatch = async (payload: CreateSaveAIBatch) => {
  const response = await fetch("/api/ai/task/generate-task/ai-batches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Failed to save the generated batch.");
  }

  return response.json();
};

export async function saveAITasks(data: { tasks: Task[]; batchId?: string }) {
  const res = await fetch("/api/ai/task/save-tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to save tasks");
  }

  return res.json();
}

export const deleteAIBatch = async (batchId: string) => {
  const response = await fetch(`/api/ai/task/generate-task/ai-batches/${batchId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let errorMessage = "Failed to delete the generated batch.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<{ success: boolean; message: string }>;
};