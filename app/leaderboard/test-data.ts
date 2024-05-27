interface Payment {
  id: string;
  amount: number;
  status: string;
  email: string;
}

export async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "b2a1d3e5",
      amount: 200,
      status: "completed",
      email: "a@example.com",
    },
    {
      id: "c3d4f6g7",
      amount: 150,
      status: "failed",
      email: "b@example.com",
    },
    {
      id: "d4e5f6h8",
      amount: 250,
      status: "pending",
      email: "c@example.com",
    },
    {
      id: "e5f6g7i9",
      amount: 300,
      status: "completed",
      email: "d@example.com",
    },
    {
      id: "f6g7h8j0",
      amount: 350,
      status: "failed",
      email: "e@example.com",
    },
    {
      id: "g7h8i9j1",
      amount: 400,
      status: "pending",
      email: "f@example.com",
    },
    {
      id: "h8i9j0k2",
      amount: 450,
      status: "completed",
      email: "g@example.com",
    },
    {
      id: "i9j0k1l3",
      amount: 500,
      status: "failed",
      email: "h@example.com",
    },
    {
      id: "j0k1l2m4",
      amount: 550,
      status: "pending",
      email: "i@example.com",
    },
    {
      id: "k1l2m3n5",
      amount: 600,
      status: "completed",
      email: "j@example.com",
    },
    {
      id: "l2m3n4o6",
      amount: 650,
      status: "failed",
      email: "k@example.com",
    },
    {
      id: "m3n4o5p7",
      amount: 700,
      status: "pending",
      email: "l@example.com",
    },
    {
      id: "n4o5p6q8",
      amount: 750,
      status: "completed",
      email: "m@example.com",
    },
    {
      id: "o5p6q7r9",
      amount: 800,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "p6q7r8s0",
      amount: 850,
      status: "pending",
      email: "o@example.com",
    },
    {
      id: "q7r8s9t1",
      amount: 900,
      status: "completed",
      email: "p@example.com",
    },
    {
      id: "r8s9t0u2",
      amount: 950,
      status: "failed",
      email: "q@example.com",
    },
    {
      id: "s9t0u1v3",
      amount: 1000,
      status: "pending",
      email: "r@example.com",
    },
    {
      id: "t0u1v2w4",
      amount: 1050,
      status: "completed",
      email: "s@example.com",
    },
  ];
}
