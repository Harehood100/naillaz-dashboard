"use client";

import { useState, useEffect, useCallback } from "react";
import AppLayout from "@/components/layout/AppLayout";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import { getTransactions } from '@/components/services/transactionService'
import { getSavingsGoals } from "@/components/services/savingsService";
import "./dashboard.css";

// ─── helpers ─────────────────────────────────────────────

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function buildChartData(transactions: any[]) {
  const now = new Date();

  const months = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      label: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      year: d.getFullYear(),
      month: d.getMonth(),
    };
  });

  const income = months.map(({ year, month }) =>
    transactions
      .filter((t) => {
        const d = new Date(t.date ?? t.createdAt);
        return (
          d.getFullYear() === year &&
          d.getMonth() === month &&
          (t.type === "income" || (t.amount ?? 0) > 0)
        );
      })
      .reduce((sum, t) => sum + Math.abs(Number(t.amount || 0)), 0)
  );

  const expense = months.map(({ year, month }) =>
    transactions
      .filter((t) => {
        const d = new Date(t.date ?? t.createdAt);
        return (
          d.getFullYear() === year &&
          d.getMonth() === month &&
          (t.type === "expense" || (t.amount ?? 0) < 0)
        );
      })
      .reduce((sum, t) => sum + Math.abs(Number(t.amount || 0)), 0)
  );

  return {
    income,
    expense,
    labels: months.map((m) => m.label),
  };
}

// category → icon emoji mapping
function getTxIcon(tx: any): string {
  const desc = (tx.description ?? tx.category ?? "").toLowerCase();
  if (desc.includes("amazon") || desc.includes("shop")) return "🛒";
  if (desc.includes("bistro") || desc.includes("food") || desc.includes("restaurant")) return "🍽️";
  if (desc.includes("sales") || desc.includes("pos")) return "💼";
  if (desc.includes("airline") || desc.includes("flight") || desc.includes("lufthansa")) return "✈️";
  if (desc.includes("dividend") || desc.includes("etf") || desc.includes("invest")) return "📈";
  if (desc.includes("creative") || desc.includes("design") || desc.includes("freelance")) return "🎨";
  if (tx.type === "income") return "💰";
  return "💳";
}

// ─── PAGE ─────────────────────────────────────────────

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [savingsGoal, setSavingsGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState<"weekly" | "monthly">("weekly");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"income" | "expense">("income");

  // ─── FETCH ─────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [txRes, savingsRes] = await Promise.all([
        getTransactions(),
        getSavingsGoals(),
      ]);

      setTransactions(Array.isArray(txRes) ? txRes : []);
      setSavingsGoal(Array.isArray(savingsRes) ? savingsRes[0] : savingsRes);
    } catch (err) {
      console.error(err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─── DERIVED DATA ─────────────────────────────────────

  const totalBalance = transactions.reduce((sum, t) => {
    return sum + (t.type === "expense" ? -Math.abs(t.amount) : Math.abs(t.amount));
  }, 0);

  const monthlyIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const chartData = buildChartData(transactions);
  const maxVal = Math.max(...chartData.income, ...chartData.expense, 1);

  // ─── SAVINGS ─────────────────────────────────────────
  const goalSaved = savingsGoal?.saved ?? 0;
  const goalTarget = savingsGoal?.targetAmount ?? 1;
  const goalPct = Math.min((goalSaved / goalTarget) * 100, 100);

  // Monthly income budget progress (e.g. 85% of a notional monthly target)
  const incomeTarget = monthlyIncome > 0 ? monthlyIncome * 1.18 : 1;
  const incomePct = Math.min((monthlyIncome / incomeTarget) * 100, 100);

  // Monthly expense budget consumption
  const expenseTarget = monthlyExpenses > 0 ? monthlyExpenses * 1.82 : 1;
  const expensePct = Math.min((monthlyExpenses / expenseTarget) * 100, 100);

  // ─── UI ─────────────────────────────────────────────

  const handleCreated = (tx: any) => {
    setTransactions((prev) => [tx, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <AppLayout title="Dashboard" activePage="dashboard">

        <div className="dash-content">

          {/* ── STAT CARDS ── */}
          <div className="dash-stats">

            {/* Total Balance */}
            <div className="stat-card stat-card--blue">
              <div className="stat-card-top">
                <p className="stat-card-label">TOTAL AVAILABLE BALANCE</p>
                <span className="stat-card-icon">💳</span>
              </div>
              <p className="stat-card-value">
                {loading ? "Loading..." : formatCurrency(totalBalance)}
              </p>
              <p className="stat-card-change positive">↑ +12.5% from last month</p>
            </div>

            {/* Monthly Income */}
            <div className="stat-card stat-card--dark">
              <div className="stat-card-top">
                <p className="stat-card-label">Monthly Income</p>
                <span className="stat-change-icon green">↓</span>
              </div>
              <p className="stat-card-value">{formatCurrency(monthlyIncome)}</p>
              <div className="stat-progress-bar">
                <div
                  className="stat-progress-fill green"
                  style={{ width: `${incomePct}%` }}
                />
              </div>
              <p className="stat-card-meta">{incomePct.toFixed(0)}% of monthly target reached</p>
            </div>

            {/* Monthly Expenses */}
            <div className="stat-card stat-card--dark">
              <div className="stat-card-top">
                <p className="stat-card-label">Monthly Expenses</p>
                <span className="stat-change-icon blue">↑</span>
              </div>
              <p className="stat-card-value">{formatCurrency(monthlyExpenses)}</p>
              <div className="stat-progress-bar">
                <div
                  className="stat-progress-fill blue"
                  style={{ width: `${expensePct}%` }}
                />
              </div>
              <p className="stat-card-meta">{expensePct.toFixed(0)}% of budget consumed</p>
            </div>

          </div>

          {/* ── CHART ── */}
          <div className="dash-card">
            <div className="chart-header">
              <div>
                <p className="chart-title">Income vs Expenses</p>
                <p className="chart-subtitle">Weekly performance overview</p>
              </div>
              <div className="chart-toggle">
                <button
                  className={`toggle-btn${chartView === "weekly" ? " active" : ""}`}
                  onClick={() => setChartView("weekly")}
                >
                  Weekly
                </button>
                <button
                  className={`toggle-btn${chartView === "monthly" ? " active" : ""}`}
                  onClick={() => setChartView("monthly")}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="bar-chart">
              {chartData.labels.map((label, i) => (
                <div key={i} className="bar-group">
                  <div className="bar-col">
                    <div
                      className="bar bar--income"
                      style={{ height: `${(chartData.income[i] / maxVal) * 180}px` }}
                      title={`Income: ${formatCurrency(chartData.income[i])}`}
                    />
                    <div
                      className="bar bar--expense"
                      style={{ height: `${(chartData.expense[i] / maxVal) * 180}px` }}
                      title={`Expense: ${formatCurrency(chartData.expense[i])}`}
                    />
                  </div>
                  <p className="bar-label">{label}</p>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="chart-legend">
              <span className="legend-dot legend-dot--income" />
              <span className="legend-label">Income</span>
              <span className="legend-dot legend-dot--expense" />
              <span className="legend-label">Expenses</span>
            </div>
          </div>

          {/* ── QUICK ACTIONS + SAVINGS ROW ── */}
          <div className="dash-row">

            {/* Quick Actions */}
            <div className="dash-card quick-actions-card">
              <p className="quick-actions-title">Quick Actions</p>
              <div className="quick-actions-grid">
                <button
                  className="quick-action-btn"
                  onClick={() => { setModalType("income"); setIsModalOpen(true); }}
                >
                  <span className="quick-action-icon">＋</span>
                  Add Income
                </button>
                <button
                  className="quick-action-btn quick-action-btn--expense"
                  onClick={() => { setModalType("expense"); setIsModalOpen(true); }}
                >
                  <span className="quick-action-icon">－</span>
                  Add Expenses
                </button>
              </div>
            </div>

            {/* Savings Goal */}
            <div className="dash-card">
              <div className="savings-goal-header">
                <div>
                  <p className="savings-goal-title">Savings Goal</p>
                  <p className="savings-goal-name">
                    {savingsGoal?.name ?? "New Home Fund"}
                  </p>
                </div>
                <span className="savings-goal-badge">
                  {goalPct.toFixed(0)}% COMPLETE
                </span>
              </div>
              <p className="savings-goal-progress-label">Progress</p>
              <div className="savings-goal-bar">
                <div
                  className="savings-goal-fill"
                  style={{ width: `${goalPct}%` }}
                />
              </div>
              <p className="stat-card-meta" style={{ marginTop: 10 }}>
                {formatCurrency(goalSaved)} of {formatCurrency(goalTarget)} saved
              </p>
            </div>

          </div>

          {/* ── RECENT TRANSACTIONS ── */}
          <div className="dash-card">
            <div className="tx-header">
              <p className="tx-title">Recent Transactions</p>
              <button className="tx-view-all">View All History</button>
            </div>

            <div className="tx-list">
              {transactions.slice(0, 8).map((tx, i) => (
                <div key={i} className="tx-row">
                  <div className="tx-icon-wrap" aria-hidden="true">
                    {getTxIcon(tx)}
                  </div>
                  <div className="tx-info">
                    <p className="tx-name">{tx.description}</p>
                    <p className="tx-date">
                      {formatDateTime(tx.date ?? tx.createdAt).toUpperCase()}
                    </p>
                  </div>
                  <span
                    className={`tx-amount ${tx.type === "income" ? "credit" : "debit"}`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </AppLayout>

      {isModalOpen && (
        <NewTransactionModal
          onClose={() => setIsModalOpen(false)}
          defaultType={modalType}
          onTransactionCreated={handleCreated}
        />
      )}
    </>
  );
}
