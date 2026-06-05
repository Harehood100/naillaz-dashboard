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
  const res = await api.get<SavingsGoal[]>("/savings/history");
  return res.data;
}

export async function createSavingsGoal(goal: GoalFormData): Promise<SavingsGoal> {
  const payload = {
    title: goal.goalName,
    targetAmount: goal.targetAmount,
    targetDate: goal.targetDate,
  };

  const res = await api.post<SavingsGoal>("/savings/add-funds/new", payload);
  return res.data;
}