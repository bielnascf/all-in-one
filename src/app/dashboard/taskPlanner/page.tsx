import { protectRoute } from "@/lib/serverSession";
import TaskContainer from "./_components/TaskContainer";

export default async function TaskPlanner() {
  await protectRoute();

  return (
    <main className="sm:ml-14 py-4 px-8 flex flex-col min-h-screen">
      <div className="border-b border-primary pb-2 mb-2">
        <h1 className="text-xl font-bold">Task Planner</h1>
      </div>

      <TaskContainer />

    </main>
  );
}
