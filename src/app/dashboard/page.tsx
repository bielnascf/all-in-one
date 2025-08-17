import CardFeature from "@/components/MainPage/FeaturesSection/CardFeature";
import TaskPlannerIcon from "@/components/Icons/TaskPlannerIcon";
import MemoHelperIcon from "@/components/Icons/MemoHelperIcon";
import CookBooker from "@/components/Icons/CookBooker";
import RoutineBuilderIcon from "@/components/Icons/RoutineBuilderIcon";
import FinancialTrackerIcon from "@/components/Icons/FinancialTrackerIcon";
import DearDiaryIcon from "@/components/Icons/DearDiaryIcon";
import { getServerSession } from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="sm:ml-14 py-4 px-8">
      <div className="border-b border-primary pb-2 mb-2">
        <h1 className="text-xl font-bold">Overview</h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:px-16">
        <Link href="/dashboard/taskPlanner" className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl">
          <CardFeature
            title="Task Planner"
            description="Create to-do lists and stay on top of your priorities"
            icon={TaskPlannerIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </Link>
        <Link href="/dashboard/memoHelp" className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl">
          <CardFeature
            title="MemoHelp"
            description="Stay logged in to securely access your saved passwords and details."
            icon={MemoHelperIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </Link>
        <Link href="/dashboard/cookBooker" className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl">
          <CardFeature
            title="CookBooker"
            description="Save, organize, and access your favorite recipes anytime."
            icon={CookBooker}
            className="h-full"
            fill="#3EAC91"
          />
        </Link>
        <Link href="/dashboard/routineBuilder" className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl">
          <CardFeature
            title="Routine Builder"
            description="Design and track your perfect daily routines."
            icon={RoutineBuilderIcon}
            className="h-full"
            stroke="#3EAC91"
          />
        </Link>
        <Link href="/dashboard/financialTracker" className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl">
          <CardFeature
            title="Financial Tracker"
            description="Monitor work-related expenses on the go."
            icon={FinancialTrackerIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </Link>
        <Link href="/dashboard/dearDiary" className="hover:shadow-lg hover:shadow-primary transition-all duration-300 rounded-xl">
          <CardFeature
            title="Dear Diary"
            description="Dear Diary – a secure space to record your thoughts and memories."
            icon={DearDiaryIcon}
            className="h-full"
            fill="#3EAC91"
          />
        </Link>
      </section>
    </main>
  );
}
