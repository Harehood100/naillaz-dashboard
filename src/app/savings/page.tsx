"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import GoalsGrid from "@/components/savings/GoalsGrid";
import SavingsChart from "@/components/charts/SavingsChart";
import CreateGoalModal from "@/components/savingsGoals/CreateGoalModal";

import {
  getSavingsGoals,
  createSavingsGoal,
  type SavingsGoal,
} from "@/components/services/savingsService";
import "./savings.css";

export default function SavingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH ON LOAD (REAL DATA)
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await getSavingsGoals();
        setGoals(data);
      } catch (err) {
        console.error("Failed to load goals:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, []);

  const handleCreateGoal = async (goalData: SavingsGoal) => {
    try {
      const newGoal = await createSavingsGoal(goalData);

      // ✅ instantly update UI (optimistic update)
      setGoals((prev) => [newGoal, ...prev]);

      setIsModalOpen(false);
    } catch (err) {
      console.error("Create goal failed:", err);
    }
  };

  return (
    <>
      <AppLayout title="Savings & Goals" activePage="savings">
        <div className="savings-content">
          <div className="savings-header">
            <h2>Manage and track your long-term financial milestones</h2>

            <button
              className="create-goal-btn"
              onClick={() => setIsModalOpen(true)}
            >
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