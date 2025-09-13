/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "@/hooks/use-toast";
import { financeSchema } from "@/lib/validation";
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { AmountFormatter } from "../AmountFormatter";
import { Label } from "@/components/ui/label";
import { useCreateFinance } from "@/hooks/useFinances";
import { CreateFinance } from "@/interfaces/IFinancialTracker";

export type FinanceFormData = z.infer<typeof financeSchema>;

export function FinanceFormModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const form = useForm<FinanceFormData>({
    resolver: zodResolver(financeSchema),
    defaultValues: {
      title: "",
      amount: 0,
      description: "",
      category: "Income",
      type: "Income",
      status: "Pending",
    },
  });

  const { mutateAsync: createFinance, isPending } = useCreateFinance();

  const onSubmit = async (data: FinanceFormData) => {
    try {
      const roundedAmount = parseFloat(data.amount.toFixed(2));

      await createFinance({
        ...data,
        amount: roundedAmount,
      } as CreateFinance);

      toast({
        title: "✔️ Success",
        description: "Finance created successfully",
      });

      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const FormContent = (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 py-4 px-2"
    >
      <div>
        <Label>Title</Label>
        <Input
          placeholder="type the finance title here..."
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>

      <div>
        <Label>Amount</Label>
        <AmountFormatter name="amount" control={form.control} />
        {form.formState.errors.amount && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.amount.message}</p>
        )}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          placeholder="type the finance description here..."
          {...form.register("description")}
        />
      </div>

      <div>
        <Label>Category</Label>
        <Select
          onValueChange={(val) => form.setValue("category", val as any)}
          defaultValue={form.getValues("category")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Finance type</Label>
        <Select
          onValueChange={(val) => form.setValue("type", val as any)}
          defaultValue={form.getValues("type")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Housing">Housing</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="PersonalCare">PersonalCare</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem>
            <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Status</Label>
        <Select
          onValueChange={(val) => form.setValue("status", val as any)}
          defaultValue={form.getValues("status")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Received">Received</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full text-white"
        disabled={isPending}
      >
        {isPending ? <Loader2Icon className="animate-spin h-4 w-4" /> : "Save"}
      </Button>
    </form>
  );

  return (
    <>
      <Button className="text-zinc-100" size="sm" onClick={() => setOpen(true)}>
        <PlusCircleIcon />
        Add section
      </Button>

      {isDesktop ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Finance</SheetTitle>
            </SheetHeader>
            {FormContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Finance</DialogTitle>
            </DialogHeader>
            {FormContent}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}