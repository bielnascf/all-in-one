import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useGenerateTasks } from "@/hooks/useGenerateTasks";
import AITaskPreviewModal from "../AITaskPreviewModal";
import { Task } from "@/interfaces/ITaskPlanner";
import { useToast } from "@/hooks/use-toast";
import {
  useDeleteAIBatch,
  useGetAIBatches,
  useSaveAITaskBatch,
} from "@/hooks/useAIBatches";
import { useSaveAITasks } from "@/hooks/useSaveAITasks";

const getTodayDateString = () => {
  const today = new Date();

  return today.toISOString().split("T")[0];
};

interface GeneratedBatch {
  id: string;
  topic: string;
  tasks: Task[];
}

export default function AIIntegration({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const DAILY_LIMIT = Number(process.env.NEXT_PUBLIC_DAILY_AI_LIMIT) || 5;
  const [usage, setUsage] = useState({ count: 0, date: getTodayDateString() });
  const [selectedBatch, setSelectedBatch] = useState<GeneratedBatch | null>(
    null
  );

  const { data: generatedBatches = [], isLoading: isLoadingBatches } =
    useGetAIBatches();

  const { mutate: deleteBatch, isPending: isDeletingBatch } =
    useDeleteAIBatch();

  const { mutate: saveBatch, isPending: isSavingBatch } = useSaveAITaskBatch();

  const { mutate: saveTasks, isPending: isSavingTasks } = useSaveAITasks();

  const { mutate: generate, isPending } = useGenerateTasks({
    onSuccess: (tasks) => {
      const newCount = usage.count + 1;
      const newUsage = { ...usage, count: newCount };
      localStorage.setItem("aiTaskGeneratorUsage", JSON.stringify(newUsage));
      setUsage(newUsage);

      saveBatch(
        {
          id: `temp-${Date.now()}`,
          topic,
          tasks: tasks.map((t) => ({
            ...t,
            createdAt: new Date().toISOString(),
            completedAt: undefined,
          })),
          createdAt: new Date().toISOString(),
        },
        {
          onSuccess: () => {
            setTopic("");
          },
        }
      );
    },
    onError: () => {
      toast({
        title: "❌ Something Wrong!",
        description: "Something went wrong. Try again later.",
        duration: 4000,
      });
    },
  });

  const isProcessing = isPending || isSavingBatch;

  useEffect(() => {
    const storedUsage = localStorage.getItem("aiTaskGeneratorUsage");
    const today = getTodayDateString();

    if (storedUsage) {
      const parsedUsage = JSON.parse(storedUsage);
      if (parsedUsage.date !== today) {
        const newUsage = { count: 0, date: today };
        localStorage.setItem("aiTaskGeneratorUsage", JSON.stringify(newUsage));
        setUsage(newUsage);
      } else {
        setUsage(parsedUsage);
      }
    } else {
      const initialUsage = { count: 0, date: today };
      localStorage.setItem(
        "aiTaskGeneratorUsage",
        JSON.stringify(initialUsage)
      );
      setUsage(initialUsage);
    }
  }, []);

  const handleGenerateTasks = async () => {
    if (usage.count >= DAILY_LIMIT) {
      toast({
        title: "⚠️ Oops...",
        description: "Daily requests limit are over. Try again later.",
        duration: 4000,
      });
    }
    if (!topic.trim()) {
      toast({
        title: "⚠️ Topic required!",
        description: "To generate tasks, a topic is required.",
        duration: 4000,
      });

      return;
    }

    generate(topic);
  };

  const handleSaveTasks = () => {
    if (!selectedBatch) return;
    saveTasks(
      { tasks: selectedBatch.tasks, batchId: selectedBatch.id },
      {
        onSuccess: () => {
          toast({
            title: "✅ Tasks saved successfully!",
          });
          setSelectedBatch(null);
        },
        onError: (err) => {
          toast({
            title: "Error saving tasks",
            description: String(err),
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleDeleteBatch = (id: string) => {
    deleteBatch(id);
  }

  const handleClosePreview = () => {
    setSelectedBatch(null);
  };

  const Content = (
    <div className="flex flex-col gap-4 py-4">
      <Input
        placeholder="Ex: Soccer"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleGenerateTasks()}
      />
      <Button
        className="text-white"
        onClick={handleGenerateTasks}
        disabled={isProcessing || !topic || usage.count > DAILY_LIMIT}
      >
        {isProcessing && <Loader2Icon className="animate-spin mr-2 h-4 w-4" />}
        Generate
      </Button>
      <div
        className={`text-sm text-center font-medium ${usage.count < DAILY_LIMIT ? "text-zinc-600" : "text-red-600"}`}
      >
        {usage.count < DAILY_LIMIT
          ? `You have used ${usage.count} of ${DAILY_LIMIT} generations today.`
          : "You have reached your daily limit."}
      </div>

      <div className="mt-4 border-t pt-4">
        <h4 className="font-semibold text-md mb-2">Generated Topics</h4>
        {isLoadingBatches ? (
          <div className="text-center text-zinc-500">
            <Loader2Icon className="animate-spin" />
            Loading topics...
          </div>
        ) : generatedBatches.length > 0 ? (
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2">
            {generatedBatches.map((batch) => (
              <div key={batch.id} className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setSelectedBatch(batch)}
                >
                  {batch.topic} ({batch.tasks.length} tasks)
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteBatch(batch.id)}
                  disabled={isDeletingBatch}
                >
                  {isDeletingBatch ? <Loader2Icon className="animate-spin"/> : <Trash2Icon className="h-4 w-4 text-red-500" />}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-zinc-500 py-4">
            Your saved topics will be here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="right" className="w-[400px] sm:w-[500px]">
            <SheetHeader>
              <SheetTitle>AI Task Hints</SheetTitle>
              <SheetDescription>
                Enter some topic and see the magic happens!
              </SheetDescription>
            </SheetHeader>
            {Content}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Task Hints</DialogTitle>
            </DialogHeader>
            {Content}
          </DialogContent>
        </Dialog>
      )}

      <AITaskPreviewModal
        open={!!selectedBatch}
        onClose={handleClosePreview}
        tasks={selectedBatch?.tasks || []}
        onSave={handleSaveTasks}
        isLoading={isSavingTasks}
      />
    </>
  );
}
