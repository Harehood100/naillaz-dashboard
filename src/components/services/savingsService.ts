// src/components/services/savingsService.ts
import api from "@/utils/api";
import type { GoalFormData } from "@/components/savingsGoals/CreateGoalModal";

export type SavingsGoal = GoalFormData & {
  _id: string;
  createdAt: string;
  title?: string;
  currentAmount?: number;
};

export async function getSavingsGoals(): Promise<SavingsGoal[]> {
  console.log("token:", localStorage.getItem("token"));
  const res = await api.get<SavingsGoal[]>("/savings/history");
  console.log("goals response:", res.data);
  return res.data;
}



export async function createSavingsGoal(goal: GoalFormData): Promise<SavingsGoal> {
  const payload = {
    name: goal.goalName,
    category: goal.goalType,
    targetAmount: Number(goal.targetAmount),
  };

  const res = await api.post<SavingsGoal>("/savings", payload);
  return res.data;
}