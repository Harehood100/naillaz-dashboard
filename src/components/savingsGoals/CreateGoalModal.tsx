// components/savings/CreateGoalModal.tsx
"use client";

import React, { useState, useEffect } from "react";

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (goalData: GoalFormData) => void;
}

export interface GoalFormData {
  goalType: string;
  targetAmount: number;
  goalName: string;
  monthlyContribution: number;
  targetDate: string;
  linkedAccount: string;
}

const GOAL_TYPES = [
  { id: "Emergency Funds", label: "Emergency Funds", icon: "🛡️" },
  { id: "Travel", label: "Travel", icon: "✈️" },
  { id: "Business", label: "Business", icon: "💼" },
  { id: "Tax Reserve", label: "Tax Reserve", icon: "📊" },
  { id: "Custom", label: "Custom", icon: "⚙️" },
];

export default function CreateGoalModal({
  isOpen,
  onClose,
  onCreateGoal,
}: CreateGoalModalProps) {
  const [formData, setFormData] = useState<GoalFormData>({
    goalType: "Emergency Funds",
    targetAmount: 5000,
    goalName: "",
    monthlyContribution: 500,
    targetDate: "",
    linkedAccount: "Chase***4412",
  });

  const [monthsToGoal, setMonthsToGoal] = useState<number | null>(null);

  useEffect(() => {
    if (formData.targetAmount > 0 && formData.monthlyContribution > 0) {
      const months = Math.ceil(formData.targetAmount / formData.monthlyContribution);
      setMonthsToGoal(months);
    } else {
      setMonthsToGoal(null);
    }
  }, [formData.targetAmount, formData.monthlyContribution]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "targetAmount" || name === "monthlyContribution"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGoal(formData);
    onClose();
    setFormData({
      goalType: "Emergency Funds",
      targetAmount: 5000,
      goalName: "",
      monthlyContribution: 500,
      targetDate: "",
      linkedAccount: "Chase***4412",
    });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isFormValid =
    formData.targetAmount > 0 &&
    formData.goalName.trim() !== "" &&
    formData.monthlyContribution > 0 &&
    formData.targetDate !== "";

  return (
    <div className="goal-modal-overlay" onClick={handleOverlayClick}>
      <div className="goal-modal-container">
        {/* Close Button */}
        <button className="goal-modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Header */}
        <div className="goal-modal-header">
          <h2 className="goal-modal-title">Create New Goal</h2>
          <p className="goal-modal-subtitle">
            Set a target and we&apos;ll help you get there
          </p>
        </div>

        <form onSubmit={handleSubmit} className="goal-modal-form">
          {/* Goal Type Cards */}
          <div className="goal-type-section">
            <label className="goal-section-label">GOAL TYPE</label>
            <div className="goal-type-grid">
              {GOAL_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, goalType: type.id }))
                  }
                  className={`goal-type-card ${
                    formData.goalType === type.id ? "active" : ""
                  }`}
                >
                  <span className="goal-type-icon">{type.icon}</span>
                  <span className="goal-type-label">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Amount Card */}
          <div className="goal-amount-card">
            <label className="goal-section-label">TARGET AMOUNT</label>
            <div className="goal-amount-input-wrapper">
              <span className="goal-currency-symbol">$</span>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                className="goal-amount-input"
                step="100"
                min="0"
              />
            </div>
          </div>

          {/* Goal Name Card */}
          <div className="goal-input-card">
            <label className="goal-section-label">GOAL NAME</label>
            <input
              type="text"
              name="goalName"
              value={formData.goalName}
              onChange={handleChange}
              placeholder="e.g. Emergency Funds"
              className="goal-text-input"
            />
          </div>

          {/* Monthly Contribution Card */}
          <div className="goal-input-card">
            <label className="goal-section-label">MONTHLY CONTRIBUTION</label>
            <div className="goal-amount-input-wrapper">
              <span className="goal-currency-symbol">$</span>
              <input
                type="number"
                name="monthlyContribution"
                value={formData.monthlyContribution}
                onChange={handleChange}
                className="goal-amount-input"
                step="50"
                min="0"
              />
            </div>
          </div>

          {/* Target Date Card */}
          <div className="goal-input-card">
            <label className="goal-section-label">TARGET DATE</label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              className="goal-date-input"
            />
          </div>

          {/* Linked Account Card */}
          <div className="goal-input-card">
            <label className="goal-section-label">LINKED ACCOUNT</label>
            <div className="goal-select-wrapper">
              <select
                name="linkedAccount"
                value={formData.linkedAccount}
                onChange={handleChange}
                className="goal-select"
              >
                <option value="Chase***4412">Chase***4412</option>
                <option value="Bank of America***7890">
                  Bank of America***7890
                </option>
                <option value="Wells Fargo***1234">Wells Fargo***1234</option>
              </select>
              <span className="goal-select-arrow">▼</span>
            </div>
          </div>

          {/* Status Message */}
          {monthsToGoal !== null &&
            formData.monthlyContribution > 0 &&
            formData.targetAmount > 0 && (
              <div className="goal-status-card">
                <span className="goal-status-icon">⚠️</span>
                <span className="goal-status-text">
                  At ${formData.monthlyContribution}/month you&apos;ll reach your
                  goal in {monthsToGoal} month{monthsToGoal !== 1 ? "s" : ""}{" "}
                  <span className="goal-status-badge">On Track</span>
                </span>
              </div>
            )}
        </form>

        {/* Footer Buttons */}
        <div className="goal-modal-footer">
          <button type="button" onClick={onClose} className="goal-btn-cancel">
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`goal-btn-create ${!isFormValid ? "disabled" : ""}`}
          >
            <span className="goal-btn-plus">+</span>
            Create Goal
          </button>
        </div>
      </div>
    </div>
  );
}