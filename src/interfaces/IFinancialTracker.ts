export interface Finance {
  id: string;
  userId: string;
  amount: number;
  title: string;
  description?: string;
  category: "Income" | "Expense";
  type: "Income" | "Housing" | "Transportation" | "Food" | "PersonalCare" | "Entertainment" | "Health" | "Shopping" | "Miscellaneous";
  status: "Pending" | "Paid" | "Received";
  date: string;
};

export interface FinanceRow {
  id: string;
  amount: number;
  title: string;
  description?: string;
  category: "Income" | "Expense";
  type: string;
  status: string;
  date: string;
};

export interface CreateFinance {
  id: string;
  amount: number;
  title: string;
  description?: string;
  category: "Income" | "Expense";
  type: "Income" | "Housing" | "Transportation" | "Food" | "PersonalCare" | "Entertainment" | "Health" | "Shopping" | "Miscellaneous";
  status: "Pending" | "Paid" | "Received";
  date?: string;
  userId: string;
}

export interface FinanceItem {
  title: string;
  amount: number;
  type: string;
  date: string;
}

export interface FinanceSummary {
  revenue: number;
  expenses: number;
  profit: number;
  toPay: number;
  topExpenses: FinanceItem[];
  topIncomes: FinanceItem[];
  topExpenseTypes: FinanceItem[];
  topPending: FinanceItem[];
  recentExpenses: FinanceItem[];
  recentIncomes: FinanceItem[];
}