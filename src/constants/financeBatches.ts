export async function getData(): Promise<{id: string, amount: number, status: string, email: string}[]> {
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "test1@example.com",
    },
    {
      id: "2",
      amount: 100,
      status: "pending",
      email: "test1@example.com",
    },
    {
      id: "3",
      amount: 100,
      status: "pending",
      email: "test1@example.com",
    },
    {
      id: "4",
      amount: 100,
      status: "pending",
      email: "test1@example.com",
    },
    {
      id: "5",
      amount: 100,
      status: "pending",
      email: "test1@example.com",
    },
    {
      id: "6",
      amount: 100,
      status: "pending",
      email: "test1@example.com",
    },
  ]
}