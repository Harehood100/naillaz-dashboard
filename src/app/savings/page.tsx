"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import GoalsGrid from "@/components/savings/GoalsGrid";
import SavingsChart from "@/components/charts/SavingsChart";
import CreateGoalModal from "@/components/savingsGoals/CreateGoalModal";

import {
  getSavingsGoals,
  type SavingsGoal,
} from "@/components/services/savingsService";
import type { GoalFormData } from "@/components/savingsGoals/CreateGoalModal";
import "./savings.css";

export default function SavingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch goals on load — fails gracefully if backend getGoals is broken
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await getSavingsGoals();
        setGoals(data);
      } catch (err) {
        console.error("Failed to load goals:", err);
        setGoals([]); // show empty state instead of crashing
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, []);

  useEffect(() => {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
}, []);

  // Matches onCreateGoal prop type in CreateGoalModal — uses _id not id
  const handleCreateGoal = (
    newGoal: GoalFormData & { _id: string; createdAt: string; currentAmount?: number }
  ) => {
    // Optimistically add the new goal to the top of the list
    setGoals((prev) => [newGoal as SavingsGoal, ...prev]);
    setIsModalOpen(false);
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
