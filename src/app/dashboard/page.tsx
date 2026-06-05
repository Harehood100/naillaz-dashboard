"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import { getTransactions } from "@/components/services/transactionService";
import "./dashboard.css";

const fallbackTransactions = [
  { id: 1, icon: "🖥️", name: "Amazon Web Service", date: "YESTERDAY, 2:00PM", amount: -156.00 },
  { id: 2, icon: "🍽️", name: "The Bistro Downtown", date: "TODAY, 7:50AM", amount: -42.50 },
  { id: 3, icon: "🖨️", name: "Direct Sales - POS", date: "MAY 5, 2:00PM", amount: 3150.25 },
  { id: 4, icon: "✈️", name: "Lufthansa Airlines", date: "MAY 10 9:00AM", amount: -840.00 },
  { id: 5, icon: "💰", name: "Dividend Payout -ETF", date: "MAY 12, 11:00AM", amount: -42.50 },
  { id: 6, icon: "📐", name: "Lamina Creatives", date: "May 15, 3:30PM", amount: 3215.00 },
  { id: 7, icon: "☕", name: "Blue Bottle Coffee", date: "MAY 20, 7:50AM", amount: -12.50 },
  { id: 8, icon: "⛽", name: "Shell Gasoline", date: "MAY 20, 12:36PM", amount: -85.20 },
];

const weeklyData = [18, 42, 28, 55, 35, 68];
const monthlyData = [32, 58, 44, 72, 48, 85];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];

export default function DashboardPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalType, setModalType] = useState<"income" | "expense">("income");
    const [transactions, setTransactions] = useState(fallbackTransactions);
const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      if (data && data.length > 0) {
        setTransactions(data);
      }
    } catch (err) {
      console.error("Using fallback transactions:", err);
      // fallback data stays — no need to do anything
    } finally {
      setLoadingData(false);
    }
  };
  fetchTransactions();
}, []);

const data = period === "weekly" ? weeklyData : monthlyData;
  const maxVal = Math.max(...data);

  return (
  <>
    <AppLayout title="Dashboard" activePage="dashboard">
      <div className="dash-content">

        {/* STAT CARDS */}
        <div className="dash-stats">

          {/* Total Balance — Blue Card */}
          <div className="stat-card stat-card--blue">
            <div className="stat-card-top">
              <p className="stat-card-label">TOTAL AVAILABLE BALANCE</p>
              <span className="stat-card-icon">🪙</span>
            </div>
            <p className="stat-card-value">$45,285.90</p>
            <p className="stat-card-change positive">↗ +12.5% from last month</p>
          </div>

          {/* Monthly Income */}
          <div className="stat-card stat-card--dark">
            <div className="stat-card-top">
              <p className="stat-card-label">Monthly Income</p>
              <span className="stat-change-icon green">↓</span>
            </div>
            <p className="stat-card-value">$12,400.00</p>
            <div className="stat-progress-bar">
              <div className="stat-progress-fill green" style={{ width: "85%" }}></div>
            </div>
            <p className="stat-card-meta">85% of monthly target reached</p>
          </div>

          {/* Monthly Expenses */}
          <div className="stat-card stat-card--dark">
            <div className="stat-card-top">
              <p className="stat-card-label">Monthly Income</p>
              <span className="stat-change-icon blue">↓</span>
            </div>
            <p className="stat-card-value">$6,842.15</p>
            <div className="stat-progress-bar">
              <div className="stat-progress-fill blue" style={{ width: "55%" }}></div>
            </div>
            <p className="stat-card-meta">55% of budget consumed</p>
          </div>

        </div>

        {/* INCOME VS EXPENSES CHART */}
        <div className="dash-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Income vs Expenses</h3>
              <p className="chart-subtitle">Weekly performance overview</p>
            </div>
            <div className="chart-toggle">
              <button
                className={`toggle-btn ${period === "weekly" ? "active" : ""}`}
                onClick={() => setPeriod("weekly")}
              >
                Weekly
              </button>
              <button
                className={`toggle-btn ${period === "monthly" ? "active" : ""}`}
                onClick={() => setPeriod("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="bar-chart">
            {data.map((val, i) => (
              <div key={i} className="bar-group">
                <div className="bar-col">
                  <div
                    className="bar bar--income"
                    style={{ height: `${(val / maxVal) * 180}px` }}
                  ></div>
                  <div
                    className="bar bar--expense"
                    style={{ height: `${(val * 0.6 / maxVal) * 180}px` }}
                  ></div>
                </div>
                <p className="bar-label">{months[i]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS + SAVINGS GOAL */}
        <div className="dash-row">

          {/* Quick Actions */}
          <div className="dash-card quick-actions-card">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              <button
  className="quick-action-btn"
  onClick={() => {
    setModalType("income");
    setIsModalOpen(true);
  }}
>
  <span className="quick-action-icon">⊕</span>
  Add Income
</button>
<button
  className="quick-action-btn quick-action-btn--expense"
  onClick={() => {
    setModalType("expense");
    setIsModalOpen(true);
  }}
>
  <span className="quick-action-icon">⊖</span>
  Add Expenses
</button>
            </div>
          </div>

          {/* Savings Goal */}
          <div className="dash-card savings-goal-card">
            <div className="savings-goal-header">
              <div>
                <h3 className="savings-goal-title">Savings Goal</h3>
                <p className="savings-goal-name">New Home Fund</p>
              </div>
              <span className="savings-goal-badge">55% COMPLETE</span>
            </div>
            <h4 className="savings-goal-progress-label">Progress</h4>
            <div className="savings-goal-bar">
              <div className="savings-goal-fill" style={{ width: "55%" }}></div>
            </div>
          </div>

        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="dash-card">
          <div className="tx-header">
            <h3 className="tx-title">Recent Transactions</h3>
            <button className="tx-view-all">View All History</button>
          </div>

          <div className="tx-list">
            {transactions.map((tx) => (
              <div key={tx.id} className="tx-row">
                <div className="tx-icon-wrap">{tx.icon}</div>
                <div className="tx-info">
                  <p className="tx-name">{tx.name}</p>
                  <p className="tx-date">{tx.date}</p>
                </div>
                <p className={`tx-amount ${tx.amount > 0 ? "credit" : "debit"}`}>
                  {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
   </AppLayout>

     {isModalOpen && (
  <NewTransactionModal
    onClose={() => setIsModalOpen(false)}
    type={modalType}
    onTransactionCreated={async () => {
      try {
        const updated = await getTransactions();
        if (updated && updated.length > 0) setTransactions(updated);
      } catch (err) {
        console.error("Could not refresh transactions:", err);
      }
      setIsModalOpen(false);
    }}
  />
)}
    </>
  );
}
