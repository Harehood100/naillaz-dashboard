const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// AUTH
export const authAPI = {
  signup: (body: object) =>
    request("/api/auth/sign-up", { method: "POST", body: JSON.stringify(body) }),

  login: (body: object) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
};

// TRANSACTIONS
export const transactionsAPI = {
  getAll: () => request("/api/transactions"),

  create: (body: object) =>
    request("/api/transactions", { method: "POST", body: JSON.stringify(body) }),

  update: (id: string, body: object) =>
    request(`/api/transactions/${id}`, { method: "PUT", body: JSON.stringify(body) }),

  delete: (id: string) =>
    request(`/api/transactions/${id}`, { method: "DELETE" }),
};

// DASHBOARD
export const dashboardAPI = {
  getSummary: () => request("/api/dashboard"),
  getAnalytics: () => request("/api/analytics"),
  getSettings: () => request("/api/settings"),
};
