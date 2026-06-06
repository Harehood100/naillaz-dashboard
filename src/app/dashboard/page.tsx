"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import { getTransactions } from "@/components/services/transactionService";
import { dashboardAPI } from "@/lib/api";
import { getSavingsGoals } from "@/components/services/savingsService";
import "./dashboard.css";

// Fallback data if API fails
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

// Helper to get transaction icon based on category or description
function getTxIcon(tx: any): string {
  const name = (tx.description || tx.name || "").toLowerCase();
  const category = (tx.category || "").toLowerCase();
  if (category.includes("food") || category.includes("dining")) return "🍽️";
  if (category.includes("transport")) return "🚗";
  if (category.includes("entertainment")) return "🎬";
  if (category.includes("utilities")) return "⚡";
  if (category.includes("shopping")) return "🛒";
  if (category.includes("health")) return "🏥";
  if (name.includes("amazon")) return "🖥️";
  if (name.includes("airline") || name.includes("flight")) return "✈️";
  if (name.includes("coffee")) return "☕";
  if (name.includes("gas") || name.includes("fuel")) return "⛽";
  if (tx.type === "income") return "💰";
  return "💳";
}

// Helper to format date
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    }).toUpperCase();
  } catch {
    return dateStr;
  }
}

// Helper to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD"
  }).format(Math.abs(amount));
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"income" | "expense">("income");

  // API data state
  const [transactions, setTransactions] = useState<any[]>(fallbackTransactions);
  const [summary, setSummary] = useState<any>(null);
  const [savingsGoal, setSavingsGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const data = period === "weekly" ? weeklyData : monthlyData;
  const maxVal = Math.max(...data);

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      // Fetch all three in parallel
      const [summaryData, txData, savingsData] = await Promise.allSettled([
        dashboardAPI.getSummary(),
        getTransactions(),
        getSavingsGoals(),
      ]);

      // Update summary/stat cards
      if (summaryData.status === "fulfilled" && summaryData.value) {
        setSummary(summaryData.value);
      }

      // Update transactions
      if (txData.status === "fulfilled" && txData.value && txData.value.length > 0) {
        setTransactions(txData.value);
      }

      // Update savings goal — use first goal
      if (savingsData.status === "fulfilled" && savingsData.value && savingsData.value.length > 0) {
        setSavingsGoal(savingsData.value[0]);
      }

    } catch (err) {
      console.error("Dashboard fetch error:", err);
      // fallback data already set as default state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Derived values from summary
  const totalBalance = summary?.totalBalance ?? summary?.balance ?? 45285.90;
  const monthlyIncome = summary?.monthlyIncome ?? summary?.income ?? 12400.00;
  const monthlyExpenses = summary?.monthlyExpenses ?? summary?.expenses ?? 6842.15;
  const incomeTarget = summary?.incomeTarget ?? monthlyIncome * 1.2;
  const expenseBudget = summary?.expenseBudget ?? monthlyExpenses * 1.8;

  const incomePct = Math.min(Math.round((monthlyIncome / incomeTarget) * 100), 100);
  const expensePct = Math.min(Math.round((monthlyExpenses / expenseBudget) * 100), 100);

  // Savings goal values
  const goalName = savingsGoal?.name ?? savingsGoal?.title ?? "New Home Fund";
  const goalSaved = savingsGoal?.saved ?? savingsGoal?.currentAmount ?? 0;
  const goalTarget = savingsGoal?.targetAmount ?? savingsGoal?.target ?? 1;
  const goalPct = Math.min(Math.round((goalSaved / goalTarget) * 100), 100);

  return (
    <>
      <AppLayout title="Dashboard" activePage="dashboard">
        <div className="dash-content">

          {/* STAT CARDS */}
          <div className="dash-stats">

            {/* Total Balance */}
            <div className="stat-card stat-card--blue">
              <div className="stat-card-top">
                <p className="stat-card-label">TOTAL AVAILABLE BALANCE</p>
                <span className="stat-card-icon">🪙</span>
              </div>
              <p className="stat-card-value">
                {loading ? "Loading..." : `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <p className="stat-card-change positive">↗ +12.5% from last month</p>
            </div>

            {/* Monthly Income */}
            <div className="stat-card stat-card--dark">
              <div className="stat-card-top">
                <p className="stat-card-label">Monthly Income</p>
                <span className="stat-change-icon green">↑</span>
              </div>
              <p className="stat-card-value">
                {loading ? "Loading..." : `$${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <div className="stat-progress-bar">
                <div className="stat-progress-fill green" style={{ width: `${incomePct}%` }}></div>
              </div>
              <p className="stat-card-meta">{incomePct}% of monthly target reached</p>
            </div>

            {/* Monthly Expenses */}
            <div className="stat-card stat-card--dark">
              <div className="stat-card-top">
                <p className="stat-card-label">Monthly Expenses</p>
                <span className="stat-change-icon blue">↓</span>
              </div>
              <p className="stat-card-value">
                {loading ? "Loading..." : `$${monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <div className="stat-progress-bar">
                <div className="stat-progress-fill blue" style={{ width: `${expensePct}%` }}></div>
              </div>
              <p className="stat-card-meta">{expensePct}% of budget consumed</p>
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
                  onClick={() => { setModalType("income"); setIsModalOpen(true); }}
                >
                  <span className="quick-action-icon">⊕</span>
                  Add Income
                </button>
                <button
                  className="quick-action-btn quick-action-btn--expense"
                  onClick={() => { setModalType("expense"); setIsModalOpen(true); }}
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
                  <p className="savings-goal-name">
                    {loading ? "Loading..." : goalName}
                  </p>
                </div>
                <span className="savings-goal-badge">
                  {loading ? "..." : `${goalPct}% COMPLETE`}
                </span>
              </div>
              <h4 className="savings-goal-progress-label">Progress</h4>
              <div className="savings-goal-bar">
                <div
                  className="savings-goal-fill"
                  style={{ width: loading ? "0%" : `${goalPct}%` }}
                ></div>
              </div>
            </div>

          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="dash-card">
            <div className="tx-header">
              <h3 className="tx-title">Recent Transactions</h3>
              <button className="tx-view-all">View All History</button>
            </div>

            {loading ? (
              <p style={{ color: "#9ca3af", fontSize: "14px", padding: "1rem 0" }}>
                Loading transactions...
              </p>
            ) : (
              <div className="tx-list">
                {transactions.slice(0, 8).map((tx: any, index: number) => {
                  const amount = tx.amount ?? 0;
                  const isCredit = tx.type === "income" || amount > 0;
                  const icon = tx.icon ?? getTxIcon(tx);
                  const name = tx.description ?? tx.name ?? "Transaction";
                  const date = tx.icon ? tx.date : formatDate(tx.date ?? tx.createdAt);

                  return (
                    <div key={tx.id ?? tx._id ?? index} className="tx-row">
                      <div className="tx-icon-wrap">{icon}</div>
                      <div className="tx-info">
                        <p className="tx-name">{name}</p>
                        <p className="tx-date">{date}</p>
                      </div>
                      <p className={`tx-amount ${isCredit ? "credit" : "debit"}`}>
                        {isCredit
                          ? `+${formatCurrency(amount)}`
                          : `-${formatCurrency(amount)}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </AppLayout>

      {isModalOpen && (
        <NewTransactionModal
          onClose={() => setIsModalOpen(false)}
          defaultType={modalType}
          onTransactionCreated={async () => {
            setIsModalOpen(false);
            await fetchDashboardData();
          }}
        />
      )}
    </>
  );
}
