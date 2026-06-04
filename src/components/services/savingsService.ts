import type { GoalFormData } from "@/components/savingsGoals/CreateGoalModal";

export type SavingsGoal = GoalFormData & {
  id: string;
  createdAt: string;
  saved?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function getSavingsGoals(): Promise<SavingsGoal[]> {
  const res = await fetch(`${BASE_URL}/api/savings`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch goals");

  return res.json();
}

export async function createSavingsGoal(
  goal: GoalFormData
): Promise<SavingsGoal> {
  const res = await fetch(`${BASE_URL}/api/savings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });

  if (!res.ok) throw new Error("Failed to create goal");

  return res.json();
}