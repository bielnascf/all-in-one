import { useMutation } from "@tanstack/react-query";
import { generateTasks } from "@/lib/api/ai/task/ai";
import { Task } from "@/interfaces/ITasks";

interface GenerateTasksOptions {
  onSuccess?: (data: Task[]) => void;
  onError?: (error: Error) => void;
}

export function useGenerateTasks({ onSuccess, onError }: GenerateTasksOptions) {
  return useMutation({
    mutationFn: (topic: string) => generateTasks(topic),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: unknown) => {
      if (onError) {
        onError(error as Error);
      }
    },
  });
}
