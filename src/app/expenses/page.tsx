"use client";

import { useState, useEffect, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import NewTransactionModal, {
  TransactionData,
} from "@/components/transactions/NewTransactionModal";
import "./expenses.css";

import { getTransactions } from "@/components/services/transactionService";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryStat = {
  name: string;
  amount: number;
  color: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const BUDGET = 400_000;

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

const WEEK_LABELS = ["WK 1", "WK 2", "WK 3", "WK 4"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function colorFor(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Other"];
}

/**
 * Split the current month's expenses into 4 roughly-equal weekly buckets
 * based on the transaction date.
 */
function buildWeeklyTotals(transactions: TransactionData[]): number[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const weekly = [0, 0, 0, 0];

  transactions.forEach((t) => {
    const d = new Date(t.date ?? "");
    if (isNaN(d.getTime())) return;
    if (d.getFullYear() !== year || d.getMonth() !== month) return;
    const day = d.getDate();
    const weekIndex = Math.min(Math.floor((day - 1) / 7), 3);
    weekly[weekIndex] += Number(t.amount ?? 0);
  });

  return weekly;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PieChart({ categories }: { categories: CategoryStat[] }) {
  const total = categories.reduce((s, c) => s + c.amount, 0);
  if (total === 0) {
    return (
      <svg width="100" height="100" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#3b4a6b" strokeWidth="3" />
        <text x="18" y="21" textAnchor="middle" fill="#94a3b8" fontSize="4">
          No data
        </text>
      </svg>
    );
  }

  let cumulativeAngle = -Math.PI / 2; // start at 12 o'clock
  const cx = 18;
  const cy = 18;
  const r = 15;

  const slices = categories.map((cat) => {
    const fraction = cat.amount / total;
    const startAngle = cumulativeAngle;
    const endAngle = startAngle + fraction * 2 * Math.PI;
    cumulativeAngle = endAngle;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = fraction > 0.5 ? 1 : 0;

    return {
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: cat.color,
      name: cat.name,
    };
  });

  return (
    <svg width="100" height="100" viewBox="0 0 36 36">
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} opacity={0.9} />
      ))}
      <circle cx={cx} cy={cy} r={8} fill="#0f172a" />
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch all transactions on mount (and after auth restores the token) ──
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();

        // Normalise: backend may return { data: [...] } or plain array
        const list: TransactionData[] = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];

        setAllTransactions(list);
      } catch (err) {
        console.error("Failed to load transactions:", err);
        setAllTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ── Optimistically prepend newly created transactions ──
  const handleTransactionCreated = (newTransaction: TransactionData) => {
    setAllTransactions((prev) => [newTransaction, ...prev]);
  };

  // ── Derive expense-only list ──
  const expenseTransactions = useMemo(
    () => allTransactions.filter((t) => t?.type === "expense"),
    [allTransactions]
  );

  // ── Budget progress ──
  const totalSpent = useMemo(
    () => expenseTransactions.reduce((sum, t) => sum + Number(t.amount ?? 0), 0),
    [expenseTransactions]
  );
  const progress = Math.min((totalSpent / BUDGET) * 100, 100);
  const remaining = BUDGET - totalSpent;

  // ── Category breakdown ──
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

  const topCategory = categoryStats[0] ?? null;

  // ── Weekly trend bars ──
  const weeklyTotals = useMemo(
    () => buildWeeklyTotals(expenseTransactions),
    [expenseTransactions]
  );
  const maxWeekly = Math.max(...weeklyTotals, 1);
  // Scale bars to max 90px height
  const barHeights = weeklyTotals.map((v) => Math.round((v / maxWeekly) * 90));

  // ── Spending limits (derived per category) ──
  const LIMITS: { name: string; limit: number }[] = [
    { name: "Food", limit: 80_000 },
    { name: "Rent", limit: 150_000 },
    { name: "Transport", limit: 40_000 },
    { name: "Utilities", limit: 30_000 },
    { name: "Entertainment", limit: 20_000 },
  ];

  const limitItems = LIMITS.map(({ name, limit }) => {
    const spent = categoryStats.find((c) => c.name === name)?.amount ?? 0;
    const pct = Math.min((spent / limit) * 100, 100);
    const status = pct >= 90 ? "danger" : pct >= 70 ? "warning" : "safe";
    return { name, spent, limit, pct, status };
  }).filter(({ spent }) => spent > 0); // only show categories that have spending

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <AppLayout title="Expense Analytics" activePage="expenses">
        <div className="expenses-content">

          {/* HEADER */}
          <div className="expenses-header">
            <p className="expenses-subtitle">Track and manage your spendings</p>
            <button className="add-expense-btn" onClick={() => setIsModalOpen(true)}>
              + Add Expenses
            </button>
          </div>

          {loading ? (
            <div className="expenses-loading">Loading expenses…</div>
          ) : (
            <div className="expenses-two-col">

              {/* ── LEFT COLUMN ── */}
              <div className="expenses-left">

                {/* BUDGET PROGRESS */}
                <div className="budget-card">
                  <p className="budget-label">MONTHLY BUDGET PROGRESS</p>
                  <div className="budget-amount">
                    <span className="budget-current">
                      ${totalSpent.toLocaleString()}
                    </span>
                    <span className="budget-total"> / ${BUDGET.toLocaleString()}</span>
                  </div>
                  <div className="budget-bar-track">
                    <div
                      className={`budget-bar-fill ${progress >= 90 ? "danger" : progress >= 70 ? "warning" : ""}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="budget-footer">
                    <span className="budget-pct">{progress.toFixed(1)}% of monthly limit</span>
                    <span className={`budget-remaining ${remaining < 0 ? "over" : ""}`}>
                      {remaining >= 0
                        ? `$${remaining.toLocaleString()} remaining`
                        : `$${Math.abs(remaining).toLocaleString()} over budget`}
                    </span>
                  </div>
                </div>

                {/* RECENT EXPENSES */}
                <div className="recent-expenses-card">
                  <div className="re-header">
                    <span className="re-title">Recent Expenses</span>
                    <a href="#" className="re-view-all">View All</a>
                  </div>

                  <div className="re-list">
                    {expenseTransactions.length === 0 ? (
                      <p className="re-empty">No expenses recorded yet.</p>
                    ) : (
                      expenseTransactions.slice(0, 8).map((item, i) => (
                        <div key={i} className="re-item">
                          <div className="re-icon-wrap">
                            <span
                              className="re-icon-dot"
                              style={{ background: colorFor(item.category ?? "") }}
                            />
                          </div>
                          <div className="re-info">
                            <p className="re-name">{item.category}</p>
                            <p className="re-date">
                              {item.description ?? "—"} ·{" "}
                              {item.date
                                ? new Date(item.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "—"}
                            </p>
                          </div>
                          <span className="re-amount">
                            -${Number(item.amount).toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="expenses-right">

                {/* SPENDING TREND (dynamic weekly bars) */}
                <div className="trend-card">
                  <p className="trend-title">Spending Trend — This Month</p>
                  <div className="trend-bars">
                    {WEEK_LABELS.map((label, i) => (
                      <div key={i} className="trend-bar-col">
                        <span className="trend-bar-value">
                          {weeklyTotals[i] > 0
                            ? `$${(weeklyTotals[i] / 1000).toFixed(0)}k`
                            : ""}
                        </span>
                        <div
                          className="trend-bar"
                          style={{ height: `${barHeights[i] || 4}px` }}
                        />
                        <p className="trend-bar-label">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CATEGORY SUMMARY */}
                <div className="category-card">
                  <p className="category-title">CATEGORY SUMMARY</p>

                  {categoryStats.length === 0 ? (
                    <p className="category-empty">No expense data yet.</p>
                  ) : (
                    <div className="category-body">
                      {/* Dynamic pie chart */}
                      <div className="category-icon-wrap">
                        <PieChart categories={categoryStats} />
                      </div>

                      {/* Legend */}
                      <div className="category-legend">
                        {categoryStats.slice(0, 4).map((cat) => (
                          <div key={cat.name} className="legend-item">
                            <span
                              className="legend-dot"
                              style={{ background: cat.color }}
                            />
                            <span className="legend-name">{cat.name}</span>
                            <span className="legend-amount">
                              ${cat.amount.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {topCategory && (
                    <p className="category-sub">
                      Top spend: <strong>{topCategory.name}</strong> — $
                      {topCategory.amount.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* SPENDING LIMITS */}
                <div className="limits-card">
                  <p className="limits-title">Spending Limits</p>
                  <div className="limits-section">
                    {limitItems.length === 0 ? (
                      <p className="limits-empty">No limit data yet.</p>
                    ) : (
                      limitItems.map((item) => (
                        <div key={item.name} className="limit-item">
                          <div className="limit-row">
                            <span className="limit-name">{item.name}</span>
                            <span className={`limit-range ${item.status}`}>
                              {item.status === "danger"
                                ? "⚠ Near limit"
                                : item.status === "warning"
                                ? "Watch out"
                                : "Safe"}
                            </span>
                          </div>
                          <div className="limit-bar-track">
                            <div
                              className={`limit-bar-fill ${item.status}`}
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                          <div className="limit-footer">
                            <span className="limit-spent">
                              ${item.spent.toLocaleString()} / ${item.limit.toLocaleString()}
                            </span>
                            <span className="limit-pct">{item.pct.toFixed(0)}%</span>
                          </div>
                        </div>
                      ))
                    )}
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
