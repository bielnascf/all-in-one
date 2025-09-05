import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WorkIcon from "@/components/Icons/Task/WorkIcon";
import PersonalIcon from "@/components/Icons/Task/PersonalIcon";
import HealthIcon from "@/components/Icons/Task/HealthIcon";
import GoalIcon from "@/components/Icons/Task/GoalIcon"; 
import { Task } from "@/interfaces/ITasks";
import { Loader2Icon, UploadIcon } from "lucide-react";

export default function AITaskPreviewModal({
  open,
  onClose,
  tasks,
  onSave,
  isLoading
}: {
  open: boolean;
  onClose: () => void;
  tasks: Task[];
  onSave: () => void;
  isLoading: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Generated Tasks</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 flex-1 overflow-y-auto py-1 px-3">
          {tasks.map((task) => (
            <div
              key={task.id ?? task.title + Date.now()}
              className="h-full p-4 rounded-lg shadow-xl flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform duration-200"
              style={{ backgroundColor: task.color }}
            >
              <div>
                <h3 className="text-sm text-center lg:text-left font-semibold mb-2 text-zinc-200">
                  {task.title}
                </h3>
              </div>

              {task.category === "Work" && (
                <div className="flex flex-1 items-center justify-center">
                  <WorkIcon fill="#d8d8d8" stroke="#d8d8d8" strokeWidth={1} />
                </div>
              )}
              {task.category === "Personal" && (
                <div className="flex flex-1 items-center justify-center">
                  <PersonalIcon
                    fill="#d8d8d8"
                    stroke="#d8d8d8"
                    strokeWidth={3}
                  />
                </div>
              )}
              {task.category === "Goal" && (
                <div className="flex flex-1 items-center justify-center">
                  <GoalIcon fill="#d8d8d8" stroke="#d8d8d8" strokeWidth={3} />
                </div>
              )}
              {task.category === "Health" && (
                <div className="flex flex-1 items-center justify-center">
                  <HealthIcon
                    fill="#d8d8d8"
                    stroke="#d8d8d8"
                    strokeWidth={3}
                  />
                </div>
              )}

              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-bold ${
                    task.completed ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </p>
                <p className="text-sm text-zinc-200 font-bold">
                  {task.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4 border-t pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button className="text-white" onClick={onSave} disabled={isLoading}>
            {isLoading ? <Loader2Icon className="animate-spin"/> : <UploadIcon/>}
            Save Tasks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
