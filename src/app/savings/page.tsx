// src/app/savings/page.tsx
"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import GoalsGrid from "@/components/savings/GoalsGrid";
import SavingsChart from "@/components/charts/SavingsChart";
import CreateGoalModal from "@/components/savingsGoals/CreateGoalModal";
import { getSavingsGoals, type SavingsGoal } from "@/components/services/savingsService";
import type { GoalFormData } from "@/components/savingsGoals/CreateGoalModal";
import "./savings.css";

export default function SavingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getSavingsGoals();
      setGoals(data);
    } catch (err) {
      console.error("Failed to load goals:", err);
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
    window.addEventListener("focus", loadGoals);
    return () => window.removeEventListener("focus", loadGoals);
  }, []);

  const handleCreateGoal = async (
    newGoal: GoalFormData & { _id: string; createdAt: string; currentAmount?: number }
  ) => {
    // Optimistic update so UI feels instant
    setGoals((prev) => [newGoal as SavingsGoal, ...prev]);
    setIsModalOpen(false);

    // Re-fetch from server so state survives reload
    try {
      const data = await getSavingsGoals();
      setGoals(data);
    } catch (err) {
      console.error("Failed to refresh goals after create:", err);
    }
  };

  return (
    <>
      <AppLayout title="Savings & Goals" activePage="savings">
        <div className="savings-content">
          <div className="savings-header">
            <h2>Manage and track your long-term financial milestones</h2>
            <button className="create-goal-btn" onClick={() => setIsModalOpen(true)}>
              + Create New Goal
            </button>
          </div>

          <GoalsGrid goals={goals} loading={loading} />

          <SavingsChart />
        </div>
      </AppLayout>

      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateGoal={handleCreateGoal}
      />
    </>
  );
}