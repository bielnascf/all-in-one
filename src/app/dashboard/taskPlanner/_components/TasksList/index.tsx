"use client";

import { useState, useMemo } from "react";
import { BadgeAlertIcon, BrainIcon, ListCheckIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task, TaskListProps } from "@/interfaces/ITaskPlanner";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import WorkIcon from "@/components/Icons/Task/WorkIcon";
import PersonalIcon from "@/components/Icons/Task/PersonalIcon";
import GoalIcon from "@/components/Icons/Task/GoalIcon";
import HealthIcon from "@/components/Icons/Task/HealthIcon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AIIntegration from "../AIIntegration";

const TASKS_PER_PAGE = parseInt(
  process.env.NEXT_PUBLIC_TASKS_PER_PAGE || "12",
  10
);

export default function TaskList({
  tasks,
  handleDeleteTask,
  handleCheckTask,
  isModalOpen,
  setIsModalOpen,
  isSheetOpen,
  setIsSheetOpen,
}: TaskListProps) {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
      .filter((task) =>
        categoryFilter === "all"
          ? true
          : task.category.toLowerCase() === categoryFilter
      )
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [tasks, search, categoryFilter]);

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);

  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * TASKS_PER_PAGE;
    return filteredTasks.slice(start, start + TASKS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  const handleTaskDetailsSheet = (task: Task) => {
    setSelectedTask(task);
    setIsSheetOpen(true);
  };

  const handleTaskDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleOpenAIModal = () => {
    setOpenModal(true);
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col sm:flex-row gap-4 items-center xl:my-6 my-2">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="text-zinc-200 border border-zinc-500 focus-visible:border-transparent focus-visible:ring-1 focus-visible:ring-primary 2xl:w-1/4 lg:w-1/3 md:w-1/2 p-2 rounded"
        />

        <div className="flex gap-2">
          {["all", "work", "personal", "goal", "health"].map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant="outline"
              onClick={() => {
                setCategoryFilter(cat);
                setCurrentPage(1);
              }}
              className={`${
                categoryFilter === cat
                  ? "bg-primary text-white"
                  : "text-zinc-200 border border-zinc-500"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
        <div className="ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="border border-zinc-500" onClick={handleOpenAIModal}>
                  <BrainIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-zinc-200">
                AI Integration
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <AIIntegration open={openModal} onOpenChange={setOpenModal} />
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rounded-lg xl:p-0 p-2 [grid-auto-rows:180px]">
          {paginatedTasks.length > 0 ? (
            paginatedTasks.map((task) => (
              <div
                key={task.id}
                className={`h-full p-4 rounded-lg shadow-xl flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
                style={{ backgroundColor: task.color }}
                onClick={() => handleTaskDetailsSheet(task)}
              >
                <div>
                  <h3 className="text-sm text-center lg:text-left font-semibold mb-2 text-zinc-200">
                    {task.title}
                  </h3>
                </div>
                {task.category == "Work" && (
                  <div className="flex flex-1 items-center justify-center">
                    <WorkIcon 
                      fill="#d8d8d8"
                      stroke="#d8d8d8"
                      strokeWidth={1}
                       />
                  </div>
                )}
                {task.category == "Personal" && (
                  <div className="flex flex-1 items-center justify-center">
                    <PersonalIcon
                      fill="#d8d8d8"
                      stroke="#d8d8d8"
                      strokeWidth={3}
                    />
                  </div>
                )}
                {task.category == "Goal" && (
                  <div className="flex flex-1 items-center justify-center">
                    <GoalIcon 
                      fill="#d8d8d8"
                      stroke="#d8d8d8"
                      strokeWidth={3}
                    />
                  </div>
                )}
                {task.category == "Health" && (
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
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <p className="text-zinc-400 text-center flex items-center flex-col sm:flex-row gap-2">
                <BadgeAlertIcon />
                No tasks found
              </p>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Task</SheetTitle>
            <SheetDescription>Details</SheetDescription>
          </SheetHeader>
          {selectedTask && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sheet-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="sheet-title"
                    value={selectedTask.title}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label
                    htmlFor="sheet-description"
                    className="text-right pt-2"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="sheet-description"
                    value={selectedTask.description || "Nenhuma descrição."}
                    readOnly
                    className="col-span-3 h-24 resize-none"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sheet-category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="sheet-category"
                    value={selectedTask.category}
                    readOnly
                    className="col-span-3 capitalize"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sheet-status" className="text-right">
                    Status
                  </Label>
                  <span
                    id="sheet-status"
                    className={`col-span-3 ${
                      selectedTask.completed
                        ? "text-green-500"
                        : "text-yellow-500"
                    } font-bold`}
                  >
                    {selectedTask.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sheet-color" className="text-right">
                    Color
                  </Label>
                  <div
                    id="sheet-color"
                    className="h-6 w-6 rounded-full col-span-3"
                    style={{ backgroundColor: selectedTask.color }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Created At</Label>
                  <span className={`col-span-3 text-sm`}>
                    {selectedTask.createdAt
                      ? new Date(selectedTask.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Check</Label>
                  <span className={`col-span-3 text-sm`}>
                    {selectedTask.completedAt
                      ? new Date(selectedTask.completedAt).toLocaleDateString()
                      : "Not completed yet."}
                  </span>
                </div>
              </div>
              <SheetFooter className="mt-8 sm:gap-0 gap-2">
                {selectedTask.completed ? null : (
                  <Button
                    className="text-white"
                    onClick={() => handleCheckTask(selectedTask)}
                  >
                    <ListCheckIcon />
                    Check
                  </Button>
                )}
                <Button
                  variant="destructive"
                  className="text-white"
                  onClick={() => handleTaskDeleteModal(selectedTask)}
                >
                  <TrashIcon />
                  Delete
                </Button>
                <Button
                  className="text-white"
                  variant="secondary"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Fechar
                </Button>
              </SheetFooter>
              <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your task from your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-white hover:bg-destructive/80"
                      onClick={() => handleDeleteTask(selectedTask.id)}
                    >
                      <TrashIcon />
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
