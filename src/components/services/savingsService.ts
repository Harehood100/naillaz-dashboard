import type { GoalFormData } from "@/components/savingsGoals/CreateGoalModal";

export type SavingsGoal = GoalFormData & {
  _id: string;
  createdAt: string;
  currentAmount?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function getSavingsGoals(): Promise<SavingsGoal[]> {
  const token = localStorage.getItem("token");

  // NOTE: getGoals on the backend has a bug — it uses undefined `Savings.find()`
  // instead of `SavingsGoal.find()`, so this will 500 until the backend is fixed.
  const res = await fetch(`${BASE_URL}/api/savings/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Backend error:", res.status, errorBody);
    throw new Error(`Failed to fetch goals (${res.status}): ${errorBody}`);
  }

  return res.json();
}

export async function createSavingsGoal(
  goal: GoalFormData
): Promise<SavingsGoal> {
  const token = localStorage.getItem("token");

  // Backend createGoal is mounted on POST /add-funds/:id
  // :id is unused in the controller so we pass "new" as a placeholder
  // Backend only uses: title, targetAmount, targetDate
  const payload = {
    title: goal.goalName,         // backend expects `title`
    targetAmount: goal.targetAmount,
    targetDate: goal.targetDate,
  };

  const res = await fetch(`${BASE_URL}/api/savings/add-funds/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Backend error:", res.status, errorBody);
    throw new Error(`Failed to create goal (${res.status}): ${errorBody}`);
  }

  return res.json();
}
