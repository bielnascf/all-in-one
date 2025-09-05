// hooks/useAIBatches.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteAIBatch, GeneratedBatch, getAIBatches, saveAIBatch } from "@/lib/api/ai/task/ai";
import { Task } from "@/interfaces/ITasks";

const BATCHES_KEY = ["ai-batches"];

export const useGetAIBatches = () => {
  return useQuery<GeneratedBatch[]>({
    queryKey: BATCHES_KEY,
    queryFn: getAIBatches,
  });
};

export interface CreateSaveAIBatch {
  id: string;
  topic: string;
  tasks: Task[];
  createdAt: string;
}

export const useSaveAITaskBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSaveAIBatch) => saveAIBatch(data),
    onMutate: async (newBatch) => {
      await queryClient.cancelQueries({ queryKey: BATCHES_KEY });

      const previous = queryClient.getQueryData<CreateSaveAIBatch[]>(BATCHES_KEY) || [];

      const optimistic: CreateSaveAIBatch = {
        id: `temp-${Date.now()}`,
        topic: newBatch.topic,
        tasks: newBatch.tasks.map((t) => ({
          ...t,
          createdAt: t.createdAt ?? new Date().toISOString(),
          checkedAt: t.completedAt ?? undefined
        })),
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<CreateSaveAIBatch[]>(BATCHES_KEY, (old = []) => [
        optimistic,
        ...old,
      ]);

      return { previous };
    },
    onError: (error, _, context) => {
      toast({
        title: "❌ Error Saving Topic",
        description: error instanceof Error ? error.message : "Could not save the topic. Please try again.",
        variant: "destructive",
      });

      if (context?.previous) {
        queryClient.setQueryData(BATCHES_KEY, context.previous);
      }
    },
    onSuccess: () => {
      toast({
        title: "✅ Topic Saved",
        description: "Your generated topic has been saved.",
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: BATCHES_KEY });
    },
  });
};

export const useDeleteAIBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAIBatch,
    onSuccess: () => {
      toast({
        title: "🗑️ Topic Deleted!",
        description: "The generated topic has been removed.",
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: BATCHES_KEY });
    },
    onError: (error) => {
      toast({
        title: "❌ Error Deleting Topic",
        description: error instanceof Error ? error.message : "Could not delete the topic. Please try again.",
        variant: "destructive",
      });
    },
  });
};
