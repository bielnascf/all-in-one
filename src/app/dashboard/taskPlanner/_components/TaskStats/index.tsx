"use client";

import { TaskStatsProps } from "@/interfaces/ITaskPlanner";
import { BadgeCheckIcon, ClipboardListIcon, HourglassIcon } from "lucide-react";

export default function TaskStats({ total, completed, pending }: TaskStatsProps) {
  return (
    <div className="flex sm:gap-4 gap-2 items-center">
      <div className="text-zinc-300">
        <span className="font-bold flex items-center gap-1">
          <ClipboardListIcon className="h-4 w-4"/>
          {total ?? 0}
        </span>
      </div>
      <div className="text-white">
        <span className="font-bold flex items-center gap-1 text-green-500">
          <BadgeCheckIcon className="h-4 w-4"/>
          {completed ?? 0}
        </span>
      </div>
      <div className="text-white">
        <span className="font-bold flex items-center gap-1 text-yellow-500">
          <HourglassIcon className="h-4 w-4"/>
          {pending ?? 0}
        </span>
      </div>
    </div>
  );
}