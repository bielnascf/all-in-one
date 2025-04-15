import TaskPlannerIcon from "@/components/Icons/TaskPlannerIcon";
import CardFeature from "./CardFeature";
import MemoHelperIcon from "@/components/Icons/MemoHelperIcon";
import CookBooker from "@/components/Icons/CookBooker";
import RoutineBuilderIcon from "@/components/Icons/RoutineBuilderIcon";
import FinancialTrackerIcon from "@/components/Icons/FinancialTrackerIcon";
import DearDiaryIcon from "@/components/Icons/DearDiaryIcon";

export default function FeaturesSection() {
  return (
    <section id="features" className="md:pt-24 px-10">
      <div>
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center mb-6">
            <span className="text-primary">All-</span>
            <span>in</span>
            <span className="text-primary">-One </span>
            Organization at Your Fingertips!
          </h2>
          <p className="text-sm text-zinc-200">
            <span className="block">
              Say goodbye to juggling multiple platforms!{" "}
            </span>
            Our system brings everything you need for{" "}
            <span className="text-primary">daily organization</span> into one
            place
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 md:px-16">
          <CardFeature 
            title="Task Planner"
            description="Create to-do lists and stay on top of your priorities"
            icon={TaskPlannerIcon}
          />
          <CardFeature 
            title="MemoHelper"
            description="Stay logged in to securely access your saved passwords and details."
            icon={MemoHelperIcon}
          />
          <CardFeature 
            title="CookBooker"
            description="Save, organize, and access your favorite recipes anytime."
            icon={CookBooker}
          />
          <CardFeature 
            title="Routine Builder"
            description="Design and track your perfect daily routines."
            icon={RoutineBuilderIcon}
          />
          <CardFeature 
            title="Financial Tracker"
            description="Monitor work-related expenses on the go."
            icon={FinancialTrackerIcon}
          />
          <CardFeature 
            title="Dear Diary"
            description="Dear Diary – a secure space to record your thoughts and memories."
            icon={DearDiaryIcon}
          />
        </div>
        <div className="text-center text-zinc-200 mt-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl text-center mb-6"><span className="text-primary">Streamline</span> your life and <span className="text-primary">save time</span> no need <br /> to look elsewhere!</h3>
          <p className="text-sm text-zinc-200 mt-4">Let me know if you&apos;d like further refinements! 😊</p>
        </div>
      </div>
    </section>
  );
}
