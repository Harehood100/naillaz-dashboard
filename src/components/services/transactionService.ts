import api from "@/utils/api";

const STORAGE_KEY = "demo_transactions";

// ─── LOCAL HELPERS ───────────────────────────────
const getLocal = () =>
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    : [];

const saveLocal = (data: any[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// ─── TRANSACTIONS ONLY (SAFE ISOLATION) ──────────
export const createTransaction = async (payload: any) => {
  // demo fallback ONLY for transactions
  const newTx = {
    ...payload,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  const existing = getLocal();
  const updated = [newTx, ...existing];

  saveLocal(updated);

  return newTx;
};

export const getAllTransactions = async () => {
  // try backend first
  try {
    const res = await api.get("/transactions");
    const data = res?.data?.data;

    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.log("Backend failed, using demo mode");
  }

  // fallback ONLY for transactions
  return getLocal();
};