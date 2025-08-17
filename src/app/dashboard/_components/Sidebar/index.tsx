"use client";

import CookBooker from "@/components/Icons/CookBooker";
import DearDiaryIcon from "@/components/Icons/DearDiaryIcon";
import FinancialTrackerIcon from "@/components/Icons/FinancialTrackerIcon";
import MemoHelperIcon from "@/components/Icons/MemoHelperIcon";
import RoutineBuilderIcon from "@/components/Icons/RoutineBuilderIcon";
import TaskPlannerIcon from "@/components/Icons/TaskPlannerIcon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Grid2X2, PanelBottom, Settings2 } from "lucide-react";
import Link from "next/link";
import ButtonSignOut from "../ButtonSignOut";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ButtonSignOutDesktop from "../ButtonSignOutDesktop";
import ButtonFullscreen from "../ButtonFullscreen";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-o left-0 z-10 hidden w-14 h-full border-r border-muted/40 bg-background sm:flex shadow-xl shadow-primary/20">
        <nav className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center gap-4 px-2 py-5">
            <TooltipProvider>
              <Link
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-muted/40 rounded-full"
                href="/dashboard"
              >
                <div className="">
                  <span className="text-primary">A</span>
                  <span className="text-white">I</span>
                  <span className="text-primary">O</span>
                </div>
                <span className="sr-only">Logo</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard"
                  >
                    <Grid2X2 className={`h-5 w-5 transition-all ${isActive("/dashboard") ? "text-white" : "text-primary"}`} />
                    <span className="sr-only">Overview</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  Overview
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard/taskPlanner") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard/taskPlanner"
                  >
                    <TaskPlannerIcon className={`${isActive("/dashboard/taskPlanner") ? "text-white" : "text-primary"} h-5 w-5 transition-all`} />
                    <span className="sr-only">Task Planner</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  Task Planner
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard/financialTracker") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard/financialTracker"
                  >
                    <FinancialTrackerIcon className={`${isActive("/dashboard/financialTracker") ? "text-white" : "text-primary"} h-5 w-5 transition-all`} />
                    <span className="sr-only">Financial Tracker</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  Financial Tracker
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard/cookBooker") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard/cookBooker"
                  >
                    <CookBooker className={`${isActive("/dashboard/cookBooker") ? "text-white" : "text-primary"} h-5 w-5 transition-all`} />
                    <span className="sr-only">Cook Booker</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  CookBooker
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard/routineBuilder") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard/routineBuilder"
                  >
                    <RoutineBuilderIcon className={`${isActive("/dashboard/routineBuilder") ? "text-white" : "text-primary"} h-5 w-5 transition-all`} stroke={isActive("/dashboard/routineBuilder") ? "#FFF" : "#3EAC91"}/>
                    <span className="sr-only">Routine Builder</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  Routine Builder
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard/memoHelp") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard/memoHelp"
                  >
                    <MemoHelperIcon className={`${isActive("/dashboard/memoHelp") ? "text-white" : "text-primary"} h-5 w-5 transition-all`} />
                    <span className="sr-only">Memo Helper</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  MemoHelp
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard/dearDiary") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard/dearDiary"
                  >
                    <DearDiaryIcon className={`${isActive("/dashboard/dearDiary") ? "text-white" : "text-primary"} h-5 w-5 transition-all`} />
                    <span className="sr-only">Dear Diary</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  Dear Diary
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col items-center gap-4 px-2 py-5">
            <TooltipProvider>
              <ButtonFullscreen />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-white ${isActive("/dashboard/settings") ? "bg-primary" : "bg-muted/40"}`}
                    href="/dashboard/settings"
                  >
                    <Settings2 className={`${isActive("/dashboard/settings") ? "text-white" : "text-primary"} h-5 w-5 transition-all`} />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  Settings
                </TooltipContent>
              </Tooltip>

              <ButtonSignOutDesktop />
            </TooltipProvider>
          </div>
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="flex h-10 w-10 bg-muted/40 rounded-full text-sm items-center justify-center md:text-base"
                  prefetch={false}
                >
                  <div className="transition-all">
                    <span className="text-primary">A</span>
                    <span className="text-white">I</span>
                    <span className="text-primary">O</span>
                  </div>
                  <span className="sr-only">Logo</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <Grid2X2 className="text-primary h-5 w-5 transition-all" />
                  Overview
                  <span className="sr-only">Overview</span>
                </Link>
                <Link
                  href="/dashboard/taskPlanner"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <TaskPlannerIcon className="h-5 w-5 transition-all" />
                  Task Planner
                  <span className="sr-only">Task Planner</span>
                </Link>
                <Link
                  href="/dashboard/finacialTracker"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <FinancialTrackerIcon className="h-5 w-5 transition-all" />
                  Financial Tracker
                  <span className="sr-only">Financial Tracker</span>
                </Link>
                <Link
                  href="/dashboard/cookBooker"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <CookBooker className="h-5 w-5 transition-all" />
                  CookBooker
                  <span className="sr-only">Cook Booker</span>
                </Link>
                <Link
                  href="/dashboard/routineBuilder"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <RoutineBuilderIcon className="h-5 w-5 transition-all" />
                  Routine Builder
                  <span className="sr-only">Routine Builder</span>
                </Link>
                <Link
                  href="/dashboard/memoHelp"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <MemoHelperIcon className="h-5 w-5 transition-all" />
                  MemoHelp
                  <span className="sr-only">Memo Helper</span>
                </Link>
                <Link
                  href="/dashboard/dearDiary"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <DearDiaryIcon className="h-5 w-5 transition-all" />
                  Dear Diary
                  <span className="sr-only">Dear Diary</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-4 px-2.5 text-sm hover:text-zinc-200 font-normal"
                  prefetch={false}
                >
                  <Settings2 className="text-primary h-5 w-5 transition-all" />
                  Settings
                  <span className="sr-only">Settings</span>
                </Link>

                <div className="mt-16 text-center">
                  <ButtonSignOut />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <h2>Menu</h2>
        </header>
      </div>
    </div>
  );
}
