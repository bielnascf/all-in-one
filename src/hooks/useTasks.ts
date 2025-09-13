"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/interfaces/ITaskPlanner";
import { apiCreateTask, apiDeleteTask, apiGetTasks, apiUpdateTask } from "@/lib/api/taskPlanner/api";

const TASKS_KEY = ["tasks"];

export function useTasks() {
 return useQuery({ queryKey: TASKS_KEY, queryFn: apiGetTasks });
}

type CreateTask = Pick<Task, "title" | "description" | "category" | "color">;

export function useCreateTask() {
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: (data: CreateTask) => apiCreateTask(data),
  onMutate: async (newTask) => {
   await queryClient.cancelQueries({ queryKey: TASKS_KEY });
   const previous = queryClient.getQueryData<Task[]>(TASKS_KEY) || [];

   const temp: Task = {
    id: `temp-${Date.now()}`,
    title: newTask.title,
    description: newTask.description,
    category: newTask.category,
    color: newTask.color,
    completed: false,
    createdAt: new Date().toISOString(),
   };

   queryClient.setQueryData<Task[]>(TASKS_KEY, [temp, ...previous]);
   return { previous };
  },
  onError: (_err, _vars, ctx) => {
   if(ctx?.previous) queryClient.setQueryData<Task[]>(TASKS_KEY, ctx.previous);
  },
  onSuccess: (created) => {
   queryClient.setQueryData<Task[]>(TASKS_KEY, (curr) => (curr || []).map((t) => (t.id.startsWith("temp-") ? created : t)));
  },
  onSettled: () => {
   queryClient.invalidateQueries({ queryKey: TASKS_KEY });
  },
 });
}

export function useUpdateTask() {
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<Task>}) => apiUpdateTask(id, data),
  onMutate: async ({ id, data }) => {
   await queryClient.cancelQueries({ queryKey: TASKS_KEY });

   const previous = queryClient.getQueryData<Task[]>(TASKS_KEY) || [];

   queryClient.setQueryData<Task[]>(TASKS_KEY, (curr) => (curr || []).map((t) => (t.id === id ? { ...t, ...data } : t)));

   return { previous };
  },
  onError: (_err, _vars, ctx) => {
   if (ctx?.previous) queryClient.setQueryData<Task[]>(TASKS_KEY, ctx.previous);
  },
  onSettled: () => {
   queryClient.invalidateQueries({ queryKey: TASKS_KEY});
  }
 })
}

export function useDeleteTask() {
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: (id: string) => apiDeleteTask(id),
  onMutate: async (id) => {
   await queryClient.cancelQueries({ queryKey: TASKS_KEY });
   const previous = queryClient.getQueryData<Task[]>(TASKS_KEY) || [];

   queryClient.setQueryData<Task[]>(TASKS_KEY, (curr) => (curr || []).filter((t) => t.id !== id));

   return { previous };
  },
  onError: (_err, _vars, ctx) => {
   if (ctx?.previous) queryClient.setQueryData<Task[]>(TASKS_KEY, ctx.previous);
  },
  onSettled: () => {
   queryClient.invalidateQueries({ queryKey: TASKS_KEY });
  }
 });
}