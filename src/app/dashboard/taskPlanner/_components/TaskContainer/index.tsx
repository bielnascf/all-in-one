"use client";

import { useState } from "react";
import { useTasks, useCreateTask, useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import AddTask from "./../AddTask";
import TaskList from "./../TasksList";
import { Task } from "@/interfaces/ITaskPlanner";
import { useToast } from "@/hooks/use-toast";
import TaskStats from "../TaskStats";

type NewTaskData = Omit<Task, "id" | "completed">;

export default function TaskContainer() {
  const { toast } = useToast();
  const { data: tasks } = useTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (taskData: NewTaskData) => {
    createTask.mutate(taskData, {
      onSuccess: () => toast({ title: "✔️ Success!", description: "Task created successfully." }),
      onError: () => toast({ title: "⚠️ Something wrong!", description: "Task was not created. Try again later." })
    })
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask.mutate(taskId, {
      onSuccess: () => toast({ title: "✔️ Success!", description: "Task deleted successfully." }),
      onError: () => toast({ title: "⚠️ Something wrong!", description: "Task was not deleted. Try again later."})
    })
    setIsModalOpen(false);
    setIsSheetOpen(false);
  };

  const handleCheckTask = (task: Task) => {
    updateTask.mutate(
      {
      id: task.id,
      data: { completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : undefined },
    },
    {
      onSuccess: () => toast({ title: "✔️ Success!", description: "Task marked as complete." }),
      onError: () => toast({ title: "⚠️ Something wrong!", description: "Task was not updated." })
    }
  )
    setIsSheetOpen(false);
  };

  return (
    <>
      <section className="px-4 py-6 flex items-center justify-between">
        <AddTask onAddTask={handleAddTask} />
        <TaskStats
          total={tasks?.length ?? 0}
          completed={tasks?.filter((t) => t.completed).length ?? 0}
          pending={tasks?.filter((t) => !t.completed).length ?? 0}
        />
      </section>

      <section className="px-4 py-2 flex-1 flex flex-col">
        <TaskList
          tasks={tasks ?? []}
          handleDeleteTask={id => handleDeleteTask(id)}
          handleCheckTask={handleCheckTask}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      </section>
    </>
  );
}
