import api from "@/utils/api";

// CREATE income/expense
export const createTransaction = async (payload: any) => {
  const response = await api.post("/transactions", payload);
  return response.data;
};


// GET income summary
export const getIncomeSummary = async () => {
  const response = await api.get("/transactions/income-summary");
  return response.data;
};

export const createExpense = async (payload: any) => {
  const response = await api.post("/expenses/add", payload);
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

