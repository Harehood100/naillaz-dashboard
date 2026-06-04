"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import NewTransactionModal, { TransactionData } from "@/components/transactions/NewTransactionModal";
import "./expenses.css";
import { getTransactions } from "@/components/services/transactionService";

const recentExpenses = [
  { icon: "🍽️", name: "The Bistro Downtown", date: "TODAY, 7:30AM", amount: -18000, color: "#e74c3c" },
  { icon: "🌐", name: "Amazon Web Service", date: "YESTERDAY, 2:00PM", amount: -20000, color: "#3b82f6" },
  { icon: "🌐", name: "Amazon Web Service", date: "MAY 25, 3:00PM", amount: -4000, color: "#3b82f6" },
  { icon: "🚗", name: "Transportation", date: "MAY 22, 4:00AM", amount: -5000, color: "#8b5cf6" },
  { icon: "⚡", name: "Electricity Bills", date: "MAY 19, 11:00AM", amount: -4000, color: "#f59e0b" },
  { icon: "✈️", name: "Lufthansa Airlines", date: "MAY 17, 9:00AM", amount: -100000, color: "#6366f1" },
  { icon: "📱", name: "Internet Bill", date: "MAY 15, 11:00AM", amount: -4000, color: "#06b6d4" },
  { icon: "📢", name: "Facebook Ads", date: "MAY 12, 12:00PM", amount: -70000, color: "#3b82f6" },
  { icon: "🚚", name: "Delivery Costs", date: "MAY 11, 3:00PM", amount: -4000, color: "#10b981" },
];

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
  const loadTransactions = async () => {
    const data = await getTransactions(); // from your service
    setTransactions(data);
  };

  loadTransactions();
}, []);

const handleTransactionCreated = (newTransaction: TransactionData) => {
  setTransactions((prev) => [newTransaction, ...prev]);
};

const expenseTransactions = transactions.filter(
  (t) => t.type === "expense"
);

  return (
    <>
      <AppLayout title="Expense Analytics" activePage="expenses">
        <div className="expenses-content">
          <div className="expenses-header">
            <p className="expenses-subtitle">Track and manage your spendings</p>
            <button className="add-expense-btn" onClick={() => setIsModalOpen(true)}>
              + Add Expenses
            </button>
          </div>

          <div className="expenses-two-col">
            {/* LEFT COLUMN */}
            <div className="expenses-left">
              {/* Budget Progress Card */}
              <div className="budget-card">
                <p className="budget-label">MONTHLY BUDGET PROGRESS</p>
                <div className="budget-amount">
                  <span className="budget-current">$390,000</span>
                  <span className="budget-total"> / $400,000</span>
                </div>
                <div className="budget-bar-track">
                  <div className="budget-bar-fill" style={{ width: "97.5%" }} />
                </div>
                <div className="budget-footer">
                  <span className="budget-pct">97.5% of monthly limit</span>
                  <span className="budget-remaining">$10,000 remaining</span>
                </div>
              </div>

              {/* Recent Expenses Table */}
              <div className="recent-expenses-card">
                <div className="re-header">
                  <span className="re-title">Recent Expenses</span>
                  <a href="#" className="re-view-all">View All</a>
                </div>
                <div className="re-list">
                  {recentExpenses.map((item, i) => (
                    <div key={i} className="re-item">
                      <div className="re-icon-wrap" style={{ background: item.color + "22" }}>
                        <span className="re-icon">{item.icon}</span>
                      </div>
                      <div className="re-info">
                        <p className="re-name">{item.name}</p>
                        <p className="re-date">{item.date}</p>
                      </div>
                      <span className="re-amount">
                        - $ {Math.abs(item.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="expenses-right">
              {/* Spending Trend Chart */}
              <div className="trend-card">
                <p className="trend-title">Spending Trend</p>
                <div className="trend-bars">
                  {[
                    { label: "WK 1", height: 60, color: "#3b82f6" },
                    { label: "WK 2", height: 75, color: "#3b82f6" },
                    { label: "WK 3", height: 55, color: "#3b82f6" },
                    { label: "WK 4", height: 90, color: "#ef4444" },
                  ].map((bar) => (
                    <div key={bar.label} className="trend-bar-col">
                      <div
                        className="trend-bar"
                        style={{ height: `${bar.height}px`, background: bar.color }}
                      />
                      <p className="trend-bar-label">{bar.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Expenses / Spending Limits */}
              <div className="limits-card">
                <p className="limits-title">Recent Expenses</p>
                <div className="limits-section">
                  <p className="limits-section-title">Spending Limits</p>
                  <div className="limit-item">
                    <div className="limit-row">
                      <span className="limit-name">Rent & Utilities</span>
                      <span className="limit-range">Safe · $11,000 / $20,000</span>
                    </div>
                    <div className="limit-bar-track">
                      <div className="limit-bar-fill safe" style={{ width: "55%" }} />
                    </div>
                  </div>
                  <div className="limit-item">
                    <div className="limit-row">
                      <span className="limit-name">Business Travel</span>
                      <span className="limit-range over">Over Limit · $108,000 / $100,000</span>
                    </div>
                    <div className="limit-bar-track">
                      <div className="limit-bar-fill over" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Summary */}
              <div className="category-card">
                <p className="category-title">CATEGORY SUMMARY</p>
                <div className="category-body">
                  <div className="category-icon-wrap">
                    <svg width="100" height="80" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#3b4a6b" strokeWidth="3" />
                      <path d="M18 18 L18 2 A16 16 0 0 1 18 34 Z" fill="#3b82f6" />
                      <path d="M18 18 L18 2 A16 16 0 1 0 18 34 Z" fill="#1e3a5f" />
                    </svg>
                  </div>
                  <div>
                    <p className="category-name">Rent dominates</p>
                    <p className="category-sub">45% of total spend</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>

      {isModalOpen && 
      <NewTransactionModal
  onClose={() => setIsModalOpen(false)}
  onTransactionCreated={handleTransactionCreated}
  defaultType="expense"
/>
}
    </>
  );
}