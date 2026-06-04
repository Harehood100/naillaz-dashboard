import api from "@/utils/api.js";

export const createTransaction = async (payload: any) => {
  const response = await api.post("/api/transactions", payload);
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get("/api/transactions");
  return response.data;
};