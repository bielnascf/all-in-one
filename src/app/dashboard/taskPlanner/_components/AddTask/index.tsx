"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusCircleIcon, SaveIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddTaskProps } from "@/interfaces/ITasks";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const MAX_TITLE_LENGTH = Number(process.env.NEXT_PUBLIC_MAX_TITLE_LENGTH);

export default function AddTask({ onAddTask }: AddTaskProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title == "" || category == "" || color == "") {
      toast({
        title: "⚠️ Oops!",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });

      return;
    }
    onAddTask({
      title,
      description,
      category,
      color,
      completed: false,
      createdAt: new Date(),
      completedAt: undefined,
    });

    toast({
      title: "✔️ Success!",
      description: "Task added successfully.",
    });

    setTitle("");
    setDescription("");
    setCategory("");
    setOpen(false);
  };

  const categories = ["Work", "Personal", "Goal", "Health"];
  const colorOptions = ["#720909", "#183514", "#45297E", "#5c2900"];

  const Form = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Type the task title"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= MAX_TITLE_LENGTH) {
                setTitle(e.target.value);
              }
            }}
          />
        </div>
        <div className="text-end">
          <p
            className={`text-sm mt-1 ${
              title.length >= MAX_TITLE_LENGTH
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {title.length} de {MAX_TITLE_LENGTH}
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Type the task description"
          value={description}
          className="resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <Label>Category</Label>
        <div className="flex gap-2 flex-wrap mt-2">
          {categories.map((c: string) => (
            <Button
              type="button"
              key={c}
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
              className="capitalize"
            >
              {c}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label>Cor</Label>
        <div className="flex gap-2 flex-wrap mt-2">
          {colorOptions.map((col) => (
            <Button
              type="button"
              key={col}
              onClick={() => setColor(col)}
              className={`w-8 h-8 p-0 rounded-full`}
              style={{ backgroundColor: col }}
            >
              {color === col && <span className="text-white">✓</span>}
            </Button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full text-white">
        <SaveIcon />
        Salvar
      </Button>
    </form>
  );

  if (isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="text-white">
            <PlusCircleIcon />
            New Task
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Add New Task</DrawerTitle>
              <DrawerDescription>
                Fill in the fields below to add a new task.
              </DrawerDescription>
            </DrawerHeader>
            {Form}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white">
          <PlusCircleIcon />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Task</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>
        {Form}
      </DialogContent>
    </Dialog>
  );
}
