"use client"

import CookBooker from "@/components/Icons/CookBooker";
import DearDiaryIcon from "@/components/Icons/DearDiaryIcon";
import FinancialTrackerIcon from "@/components/Icons/FinancialTrackerIcon";
import MemoHelperIcon from "@/components/Icons/MemoHelperIcon";
import RoutineBuilderIcon from "@/components/Icons/RoutineBuilderIcon";
import { Spinner } from "@/components/Icons/SpinnerIcon";
import TaskPlannerIcon from "@/components/Icons/TaskPlannerIcon";
import CardFeature from "@/components/MainPage/FeaturesSection/CardFeature";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OverviewCards() {
  const router = useRouter();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const handleClick = (path: string) => {
    setLoadingPath(path);
    router.push(path);
  }


  return (
    <>
      <button className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl" onClick={() => handleClick("/dashboard/taskPlanner")} disabled={loadingPath === "/dashboard/taskPlanner"}>
          <CardFeature
            title="Task Planner"
            description="Create to-do lists and stay on top of your priorities"
            icon={loadingPath === "/dashboard/taskPlanner" ? Spinner : TaskPlannerIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </button>
        <button className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl" onClick={() => handleClick("/dashboard/memoHelp")} disabled ={loadingPath === "/dashboard/memoHelp"}>
          <CardFeature
            title="MemoHelp"
            description="Stay logged in to securely access your saved passwords and details."
            icon={loadingPath === "/dashboard/memoHelp" ? Spinner : MemoHelperIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </button>
        <button className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl" onClick={() => handleClick("/dashboard/cookBooker")} disabled={loadingPath === "/dashboard/cookBooker"}>
          <CardFeature
            title="CookBooker"
            description="Save, organize, and access your favorite recipes anytime."
            icon={loadingPath === "/dashboard/cookBooker" ? Spinner : CookBooker}
            className="h-full"
            fill="#3EAC91"
          />
        </button>
        <button className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl" onClick={() => handleClick("/dashboard/routineBuilder")} disabled={loadingPath === "/dashboard/routineBuilder"}>
          <CardFeature
            title="Routine Builder"
            description="Design and track your perfect daily routines."
            icon={loadingPath === "/dashboard/routineBuilder" ? Spinner : RoutineBuilderIcon}
            className="h-full"
            stroke="#3EAC91"
          />
        </button>
        <button className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl" onClick={() => handleClick("/dashboard/financialTracker")} disabled={loadingPath === "/dashboard/financialTracker"}>
          <CardFeature
            title="Financial Tracker"
            description="Monitor work-related expenses on the go."
            icon={loadingPath === "/dashboard/financialTracker" ? Spinner : FinancialTrackerIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </button>
        <button className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl" onClick={() => handleClick("/dashboard/dearDiary")} disabled={loadingPath === "/dashboard/dearDiary"}>
          <CardFeature
            title="Dear Diary"
            description="Dear Diary – a secure space to record your thoughts and memories."
            icon={loadingPath === "/dashboard/dearDiary" ? Spinner : DearDiaryIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </button>
    </>
  )
};
