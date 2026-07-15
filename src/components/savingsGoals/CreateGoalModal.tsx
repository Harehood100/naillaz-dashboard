"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createSavingsGoal, type SavingsGoal } from "@/components/services/savingsService";
import "./CreateGoalModal.css";

type CreateGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (goal: SavingsGoal) => void;
};

const goalTypes = [
  { id: "emergency", label: "Emergency Funds", icon: "🏠" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "business", label: "Business", icon: "💳" },
  { id: "tax", label: "Tax Reserve", icon: "💰" },
  { id: "custom", label: "Custom", icon: "✨" },
];

export default function CreateGoalModal({
  isOpen,
  onClose,
  onCreateGoal,
}: CreateGoalModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("emergency");
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(5000);
  const [targetDate, setTargetDate] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [linkedAccount, setLinkedAccount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const created = await createSavingsGoal({
        goalType: selectedGoal,
        goalName,
        targetAmount,
        targetDate,
        monthlyContribution,
        linkedAccount,
      });

      onCreateGoal(created);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const monthsToGoal =
    monthlyContribution > 0 ? Math.ceil(targetAmount / monthlyContribution) : 0;

  return (
    <div className="goal-modal-overlay">
      <div className="goal-modal">
        <div className="goal-header">
          <div>
            <h2>Create New Goal</h2>
            <p>Set a target and we'll help you get there</p>
          </div>
          <button className="goal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="goal-section">
          <span className="section-label">GOAL TYPE</span>
          <div className="goal-types">
            {goalTypes.map((goal) => (
              <button
                key={goal.id}
                type="button"
                className={`goal-type-card ${selectedGoal === goal.id ? "active" : ""}`}
                onClick={() => setSelectedGoal(goal.id)}
              >
                <span className="goal-type-label">{goal.label}</span>
                <span className="goal-icon">{goal.icon}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="target-amount-card">
          <span>Target Amount</span>
          <div className="amount-input-wrapper">
            <span>$</span>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="target-amount-input"
            />
          </div>
        </div>

        <div className="goal-form-grid">
          <div className="form-group">
            <label>Goal Name</label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g Emergency Funds"
            />
          </div>

          <div className="form-group">
            <label>Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Monthly Contribution</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              placeholder="$500"
            />
          </div>

          <div className="form-group">
            <label>Linked Account</label>
            <input
              type="text"
              value={linkedAccount}
              onChange={(e) => setLinkedAccount(e.target.value)}
              placeholder="Chase***4412"
            />
          </div>
        </div>

        <div className="goal-estimate">
          💡 At ${monthlyContribution.toLocaleString()}/month you'll reach your goal in{" "}
          {monthsToGoal} month{monthsToGoal !== 1 ? "s" : ""}
        </div>

        <div className="goal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="create-goal-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "⊕ Create Goal"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}
