/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataTable } from "../DataTable/data-table";
import { useDeleteFinance, useFinances } from "@/hooks/useFinances";
import { useMemo, useState } from "react";
import { Finance } from "@/interfaces/IFinancialTracker";
import { Loader2, Loader2Icon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FinanceRow } from "@/interfaces/IFinancialTracker";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FinancesTableClient() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteFinance = useDeleteFinance();
  const { data, isPending, error } = useFinances();
  const { toast } = useToast();

  const handleDeleteFinance = async (id: string) => {
    setIsLoading(true);
    deleteFinance.mutate(id, {
      onSuccess: () => {
        toast({ title: "✔️ Success!", description: "Finance deleted successfully." });
        setIsLoading(false);
      },
      onError: () => {
        toast({ title: "⚠️ Something wrong!", description: "Finance was not deleted. Try again later."});
        setIsLoading(false);
      }
    })
  }

  const columns: ColumnDef<FinanceRow>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount);

        return <div className="text-left font-medium">{formatted}</div>;
      },
      meta: { align: "left" },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date: string = row.getValue("date");
        const [year, month, day] = date.split("-");
        const dateFormatted = `${day}/${month}/${year}`;

        return <div className="text-left font-medium">{dateFormatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-blue-900"
              size="sm"
              title="Edit"
              data-id={id}
            >
              <Edit />
            </Button>
            <Button
              variant="ghost"
              className={`${isLoading ? "text-zinc-200" : "text-[#FF4D4F]"}`}
              size="sm"
              title="Delete"
              data-id={id}
              onClick={() => handleDeleteFinance(id)}
            >
              {isLoading ? <Loader2Icon className="animate-spin w-4 h-4" /> : <Trash2Icon />}
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    if (!data) return [];

    const items: Finance[] = Array.isArray(data)
      ? data
      : ((data as any).finances ?? []);

    return items.map((f: any) => {
      let formattedDate = "-";
      if (f.date) {
        formattedDate = new Date(f.date).toLocaleDateString("pt-BR");
      }
      return { ...f, formattedDate };
    });
  }, [data]);

  if (isPending)
    return (
      <div className="text-zinc-500 flex gap-2">
        <Loader2 className="animate-spin w-4 h-4" />
        Loading items
      </div>
    );
  if (error) return <div>Erro ao carregar</div>;

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}