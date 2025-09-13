import { CreateFinance, Finance, FinanceSummary } from "@/interfaces/IFinancialTracker";

async function handle<T>(res: Response): Promise<T> {
 if(!res.ok) {
  const msg = await res.text().catch(() => res.statusText);
  throw new Error(msg || "Request failed");
 }

 return res.json();
}

export async function apiGetFinances(): Promise<Finance[]> {
 const res = await fetch("/api/financialTracker", { cache: "no-store" });

 return handle<Finance[]>(res);
}
export async function apiCreateFinance(data: CreateFinance): Promise<Finance> {
 const res = await fetch("/api/financialTracker", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 return handle<Finance>(res);
}

export async function apiUpdateFinance(financeId: string, data: Partial<Finance>): Promise<Finance> {
 const res = await fetch(`/api/financialTracker/${financeId}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 return handle<Finance>(res);
}

export async function apiDeleteFinance(id: string): Promise<{message: string}> {
 const res = await fetch(`/api/financialTracker/${id}`, { method: "DELETE" });

 return handle<{ message: string}>(res);
}

export async function apiGetFinanceSummary(): Promise<FinanceSummary> {
  const res = await fetch("/api/financialTracker/summary", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if(!res.ok) {
    throw new Error("Failed to fetch finance summary");
  }

  return handle<FinanceSummary>(res);
}