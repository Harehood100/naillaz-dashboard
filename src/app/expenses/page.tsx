"use client";

import { useState, useEffect, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import NewTransactionModal, {
  TransactionData,
} from "@/components/transactions/NewTransactionModal";
import "./expenses.css";
import { getAllTransactions } from "@/components/services/transactionService";

// ─── TYPES ───────────────────────────────────────────────

type CategoryStat = {
  name: string;
  amount: number;
  color: string;
};

// ─── CONSTANTS ───────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#3b82f6",
  Rent: "#6366f1",
  Transport: "#8b5cf6",
  Utilities: "#06b6d4",
  Entertainment: "#f59e0b",
  Health: "#10b981",
  Shopping: "#f43f5e",
  Education: "#84cc16",
  Other: "#94a3b8",
};

const CATEGORY_LIMIT_PCT: Record<string, number> = {
  Food: 0.2,
  Rent: 0.35,
  Transport: 0.1,
  Utilities: 0.08,
  Entertainment: 0.05,
  Health: 0.08,
  Shopping: 0.08,
  Education: 0.05,
  Other: 0.05,
};

const WEEK_LABELS = ["WK 1", "WK 2", "WK 3", "WK 4"];

// category → icon emoji
const CATEGORY_ICONS: Record<string, string> = {
  Food: "🍔",
  Rent: "🏠",
  Transport: "🚗",
  Utilities: "⚡",
  Entertainment: "🎬",
  Health: "💊",
  Shopping: "🛍️",
  Education: "📚",
  Other: "💳",
};

// ─── HELPERS ─────────────────────────────────────────────

function colorFor(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;
}

function iconFor(category: string) {
  return CATEGORY_ICONS[category] ?? CATEGORY_ICONS.Other;
}

function parseDate(raw: string): Date {
  if (!raw) return new Date();
  if (raw.includes("T")) return new Date(raw);
  const [y, m, d] = raw.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getTransactionDate(t: any): Date | null {
  const raw = t.date ?? t.transactionDate ?? t.createdAt ?? t.created_at ?? "";
  if (!raw) return null;
  const d = parseDate(String(raw));
  return isNaN(d.getTime()) ? null : d;
}

function isSameMonth(t: any, year: number, month: number): boolean {
  const d = getTransactionDate(t);
  if (!d) return false;
  return d.getFullYear() === year && d.getMonth() === month;
}

function formatDateTime(t: any): string {
  const d = getTransactionDate(t);
  if (!d) return "";
  return d
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
    .toUpperCase();
}

function buildWeeklyTotals(transactions: TransactionData[]) {
  const weekly = [0, 0, 0, 0];
  transactions.forEach((t) => {
    const d = getTransactionDate(t);
    if (!d) return;
    const week = Math.min(Math.floor((d.getDate() - 1) / 7), 3);
    weekly[week] += Number(t.amount ?? 0);
  });
  return weekly;
}

// ─── SPENDING TREND BAR CHART ────────────────────────────

function SpendingTrendChart({
  weeklyTotals,
}: {
  weeklyTotals: number[];
}) {
  const maxWeek = Math.max(...weeklyTotals, 1);
  const maxBarHeight = 90;

  return (
    <div className="trend-bars">
      {weeklyTotals.map((v, i) => {
        const isMax = v === Math.max(...weeklyTotals) && v > 0;
        return (
          <div key={i} className="trend-bar-col">
            <span className="trend-bar-value">
              {v > 0 ? `$${(v / 1000).toFixed(0)}k` : ""}
            </span>
            <div
              className={`trend-bar${isMax ? " trend-bar--peak" : ""}`}
              style={{ height: `${(v / maxWeek) * maxBarHeight}px` }}
            />
            <span className="trend-bar-label">{WEEK_LABELS[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── PIE CHART ──────────────────────────────────────────

function PieChart({ categories }: { categories: CategoryStat[] }) {
  const total = categories.reduce((s, c) => s + c.amount, 0);

  if (total === 0) {
    return (
      <svg width="72" height="72" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="15" fill="none" stroke="#1a2a45" strokeWidth="2" />
      </svg>
    );
  }

  let angle = -Math.PI / 2;
  const cx = 18, cy = 18, r = 15;

  return (
    <svg width="72" height="72" viewBox="0 0 36 36">
      {categories.map((cat, i) => {
        const frac = cat.amount / total;
        const start = angle;
        const end = angle + frac * 2 * Math.PI;
        angle = end;

        const x1 = cx + r * Math.cos(start);
        const y1 = cy + r * Math.sin(start);
        const x2 = cx + r * Math.cos(end);
        const y2 = cy + r * Math.sin(end);
        const largeArc = frac > 0.5 ? 1 : 0;

        return (
          <path
            key={i}
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={cat.color}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={8} fill="#0a1628" />
    </svg>
  );
}

// ─── PAGE ───────────────────────────────────────────────

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  // ─── FETCH ─────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getAllTransactions();
        const data = Array.isArray(res) ? res : res?.data?.data || res?.data || [];
        setAllTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Expense load error:", err);
        setAllTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleTransactionCreated = (tx: TransactionData) => {
    setAllTransactions((prev) => [tx, ...prev]);
    setIsModalOpen(false);
  };

  // ─── FILTERS ───────────────────────────────────────────
  const expenseTransactions = useMemo(
    () => allTransactions.filter((t) => t.type === "expense" && isSameMonth(t, year, month)),
    [allTransactions, year, month]
  );

  const incomeThisMonth = useMemo(
    () =>
      allTransactions
        .filter((t) => t.type === "income" && isSameMonth(t, year, month))
        .reduce((s, t) => s + Number(t.amount ?? 0), 0),
    [allTransactions, year, month]
  );

  // ─── TOTALS ────────────────────────────────────────────
  const spent = expenseTransactions.reduce((s, t) => s + Number(t.amount ?? 0), 0);
  const budget = incomeThisMonth || spent * 1.03 || 1;
  const progress = Math.min((spent / budget) * 100, 100);
  const remaining = budget - spent;

  // ─── CATEGORY STATS ────────────────────────────────────
  const categoryStats: CategoryStat[] = useMemo(() => {
    const map: Record<string, number> = {};
    expenseTransactions.forEach((t) => {
      const cat = t.category ?? "Other";
      map[cat] = (map[cat] ?? 0) + Number(t.amount ?? 0);
    });
    return Object.entries(map)
      .map(([name, amount]) => ({ name, amount, color: colorFor(name) }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenseTransactions]);

  const weeklyTotals = useMemo(
    () => buildWeeklyTotals(expenseTransactions),
    [expenseTransactions]
  );

  const totalCatSpend = categoryStats.reduce((s, c) => s + c.amount, 0);
  const topCategory = categoryStats[0];

  // Spending limits per category based on budget
  const limitsData = useMemo(() => {
    return categoryStats.slice(0, 4).map((cat) => {
      const limitAmt = budget * (CATEGORY_LIMIT_PCT[cat.name] ?? 0.05);
      const pct = limitAmt > 0 ? Math.min((cat.amount / limitAmt) * 100, 100) : 0;
      const status = pct >= 100 ? "danger" : pct >= 80 ? "warning" : "safe";
      const statusLabel =
        status === "danger"
          ? `Over Limit · $${cat.amount.toLocaleString()} / $${Math.round(limitAmt).toLocaleString()}`
          : `Safe · $${cat.amount.toLocaleString()} / $${Math.round(limitAmt).toLocaleString()}`;
      return { ...cat, limitAmt, pct, status, statusLabel };
    });
  }, [categoryStats, budget]);

  // ─── UI ────────────────────────────────────────────────

  return (
    <>
      <AppLayout title="Expense Analytics" activePage="expenses">
        <div className="expenses-content">

          {/* ── HEADER ── */}
          <div className="expenses-header">
            <p className="expenses-subtitle">Track and manage your spendings</p>
            <button className="add-expense-btn" onClick={() => setIsModalOpen(true)}>
              + Add Expenses
            </button>
          </div>

          {loading ? (
            <div className="expenses-loading">Loading expenses…</div>
          ) : (
            <div className="expenses-grid">

              {/* ══ LEFT: Budget Progress + Recent Expenses ══ */}
              <div className="expenses-col expenses-col--left">

                {/* Budget Progress */}
                <div className="budget-card">
                  <p className="budget-label">
                    MONTHLY BUDGET PROGRESS
                  </p>
                  <div className="budget-amount">
                    <span className="budget-current">${spent.toLocaleString()}</span>
                    <span className="budget-sep"> / </span>
                    <span className="budget-total">${budget.toLocaleString()}</span>
                  </div>
                  <div className="budget-bar-track">
                    <div
                      className={`budget-bar-fill${progress >= 100 ? " danger" : progress >= 80 ? " warning" : ""}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="budget-footer">
                    <span className="budget-pct">{progress.toFixed(1)}% of monthly limit</span>
                    <span className={`budget-remaining${remaining < 0 ? " over" : ""}`}>
                      {remaining >= 0
                        ? `$${remaining.toLocaleString()} remaining`
                        : `$${Math.abs(remaining).toLocaleString()} over`}
                    </span>
                  </div>
                </div>

                {/* Recent Expenses */}
                <div className="recent-expenses-card">
                  <div className="re-header">
                    <p className="re-title">Recent Expenses</p>
                    <a href="#" className="re-view-all">View All</a>
                  </div>
                  <div className="re-list">
                    {expenseTransactions.length === 0 ? (
                      <p className="re-empty">No expenses this month.</p>
                    ) : (
                      expenseTransactions.slice(0, 8).map((t, i) => (
                        <div key={i} className="re-item">
                          <div
                            className="re-icon-wrap"
                            style={{ background: colorFor(t.category ?? "Other") + "22" }}
                          >
                            <span className="re-icon">{iconFor(t.category ?? "Other")}</span>
                          </div>
                          <div className="re-info">
                            <p className="re-name">{t.description ?? t.category}</p>
                            <p className="re-date">{formatDateTime(t)}</p>
                          </div>
                          <span className="re-amount">
                            - ${Number(t.amount).toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* ══ RIGHT: Trend + Limits + Category ══ */}
              <div className="expenses-col expenses-col--right">

                {/* Spending Trend */}
                <div className="trend-card">
                  <p className="trend-title">Spending Trend</p>
                  <SpendingTrendChart weeklyTotals={weeklyTotals} />
                </div>

                {/* Recent Expenses label (right side) */}
                <div className="right-section-label">
                  <p className="section-label-text">Recent Expenses</p>
                </div>

                {/* Spending Limits */}
                <div className="limits-card">
                  <p className="limits-title">Spending Limits</p>
                  {limitsData.length === 0 ? (
                    <p className="limits-empty">No data yet.</p>
                  ) : (
                    limitsData.map((item) => (
                      <div key={item.name} className="limit-item">
                        <div className="limit-row">
                          <span className="limit-name">{item.name}</span>
                          <span className={`limit-range ${item.status}`}>
                            {item.statusLabel}
                          </span>
                        </div>
                        <div className="limit-bar-track">
                          <div
                            className={`limit-bar-fill ${item.status}`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Category Summary */}
                <div className="category-card">
                  <p className="category-title">CATEGORY SUMMARY</p>
                  <div className="category-body">
                    <div className="category-icon-wrap">
                      <PieChart categories={categoryStats} />
                    </div>
                    <div className="category-info">
                      {topCategory ? (
                        <>
                          <p className="category-name">{topCategory.name} dominates</p>
                          <p className="category-sub">
                            {totalCatSpend > 0
                              ? `${Math.round((topCategory.amount / totalCatSpend) * 100)}% of total spend`
                              : "—"}
                          </p>
                        </>
                      ) : (
                        <p className="category-empty">No category data</p>
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      </AppLayout>

      {isModalOpen && (
        <NewTransactionModal
          onClose={() => setIsModalOpen(false)}
          onTransactionCreated={handleTransactionCreated}
          defaultType="expense"
        />
      )}
    </>
  );
}
