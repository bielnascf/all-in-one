import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveAITasks } from "@/lib/api/ai/taskPlanner/ai";
import { toast } from "@/hooks/use-toast";

export function useSaveAITasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveAITasks,
    onSuccess: () => {
      toast({
        title: "✅ Tasks Saved",
        description: "The AI generated tasks have been added to your list.",
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["ai-batches"] });
    },
    onError: (error) => {
      toast({
        title: "❌ Error Saving Tasks",
        description:
          error instanceof Error ? error.message : "Could not save tasks. Please try again.",
        variant: "destructive",
      });
    },
  });
}