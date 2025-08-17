import { getServerSession } from "@/lib/getServerSession";
import { redirect } from "next/navigation";

export default function FinancialTracker() {
const session = getServerSession();

  if(!session) {
    redirect("/");
  }
 return (
  <main className="sm:ml-14 py-4 px-8">
      <div className="border-b border-primary pb-2 mb-2">
        <h1 className="text-xl font-bold">Financial Tracker</h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:px-16">
        
      </section>
    </main>
 )
};
