"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateFinance, Finance } from "@/interfaces/IFinancialTracker";
import {
  apiCreateFinance,
  apiDeleteFinance,
  apiGetFinances,
  apiGetFinanceSummary,
  apiUpdateFinance,
} from "@/lib/api/financialTracker/api";

const FINANCES_KEY = ["finances"];
const FINANCES_SUMMARY_KEY = ["financeSummary"];

export function useFinances() {
  return useQuery({ queryKey: FINANCES_KEY, queryFn: apiGetFinances });
}

export function useCreateFinance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFinance) => apiCreateFinance(data),
    onMutate: async (newFinance) => {
      await queryClient.cancelQueries({ queryKey: FINANCES_KEY });
      const previous = queryClient.getQueryData<Finance[]>(FINANCES_KEY) || [];

      const temp: Finance = {
        id: `temp-${Date.now()}`,
        userId: newFinance.userId,
        amount: newFinance.amount,
        title: newFinance.title,
        description: newFinance.description,
        category: newFinance.category,
        type: newFinance.type,
        status: newFinance.status,
        date: new Date().toISOString(),
      };

      queryClient.setQueryData<Finance[]>(FINANCES_KEY, [temp, ...previous]);
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData<Finance[]>(FINANCES_KEY, ctx.previous);
    },
    onSuccess: (created: Finance) => {
      queryClient.setQueryData<Finance[]>(FINANCES_KEY, (curr) => {
        if (!curr) return [created];
        return curr.map((f) => (f.id.startsWith("temp-") ? created : f));
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FINANCES_KEY });
      queryClient.invalidateQueries({ queryKey: FINANCES_SUMMARY_KEY });
    },
  });
}

export function useUpdateFinance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Finance> }) =>
      apiUpdateFinance(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: FINANCES_KEY });

      const previous = queryClient.getQueryData<Finance[]>(FINANCES_KEY) || [];

      queryClient.setQueryData<Finance[]>(FINANCES_KEY, (curr) =>
        (curr || []).map((f) => (f.id === id ? { ...f, ...data } : f))
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData<Finance[]>(FINANCES_KEY, ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FINANCES_KEY });
    },
  });
}

export function useDeleteFinance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiDeleteFinance(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: FINANCES_KEY });
      const previous = queryClient.getQueryData<Finance[]>(FINANCES_KEY) || [];

      queryClient.setQueryData<Finance[]>(FINANCES_KEY, (curr) =>
        (curr || []).filter((f) => f.id !== id)
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData<Finance[]>(FINANCES_KEY, ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FINANCES_KEY });
    },
  });
}

export function useFinanceSummary() {
  return useQuery({ 
    queryKey: FINANCES_SUMMARY_KEY, 
    queryFn: apiGetFinanceSummary,
    refetchInterval: 10000,
    refetchOnWindowFocus: true, 
  });
}