"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import GoalsGrid from "@/components/savings/GoalsGrid";
import SavingsChart from "@/components/charts/SavingsChart";
import CreateGoalModal, { GoalFormData } from "@/components/savingsGoals/CreateGoalModal";
import "./savings.css";

export default function SavingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateGoal = (goalData: GoalFormData) => {
    console.log("New goal created:", goalData);
    // TODO: Add API call to save the goal
    // TODO: Refresh the goals list or update state
    // TODO: Show success toast notification
  };

  return (
    <>
      <AppLayout title="Savings & Goals" activePage="savings">
        <div className="savings-content">
          <div className="savings-header">
            <h2>Manage and track your long-term financial milestones</h2>

            <button className="create-goal-btn" onClick={handleOpenModal}>
              + Create New Goal
            </button>
          </div>

          <GoalsGrid />
          <SavingsChart />
        </div>
      </AppLayout>

      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateGoal={handleCreateGoal}
      />
    </>
  );
}