"use client";

import { useEffect, useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import IncomeTable from "@/components/income/IncomeTable";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import RevenueMixChart from "@/components/income/RevenueMixChart";
import "./income.css";

import { getAllTransactions } from "@/components/services/transactionService";

// ─── Helpers ─────────────────────────────────────────────

function isSameMonth(dateStr: string, year: number, month: number) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return d.getFullYear() === year && d.getMonth() === month;
}

function buildRevenueMix(transactions: any[]) {
  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    const cat = t.category || "Other";
    map[cat] = (map[cat] || 0) + Number(t.amount || 0);
  });

  const total = Object.values(map).reduce((a, b) => a + b, 0);

  return Object.entries(map)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

// ─── Page ─────────────────────────────────────────────

export default function IncomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const lastMonthDate = new Date(year, month - 1, 1);
  const lastYear = lastMonthDate.getFullYear();
  const lastMonth = lastMonthDate.getMonth();

  // ─── FETCH ─────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getAllTransactions();
        const list = Array.isArray(res) ? res : [];
        setTransactions(list);
      } catch (err) {
        console.error("Income load error:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ─── FILTER INCOME ─────────────────────────────────────
  const thisMonthIncome = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.type === "income" &&
          isSameMonth(t.date || t.createdAt, year, month)
      ),
    [transactions, year, month]
  );

  const lastMonthIncome = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.type === "income" &&
          isSameMonth(t.date || t.createdAt, lastYear, lastMonth)
      ),
    [transactions, lastYear, lastMonth]
  );

  // ─── TOTALS ───────────────────────────────────────────
  const totalIncome = useMemo(
    () => thisMonthIncome.reduce((sum, t) => sum + Number(t.amount || 0), 0),
    [thisMonthIncome]
  );

  const lastTotal = useMemo(
    () => lastMonthIncome.reduce((sum, t) => sum + Number(t.amount || 0), 0),
    [lastMonthIncome]
  );

  // Pending = transactions without a cleared status
  const pendingTransactions = useMemo(
    () => thisMonthIncome.filter((t) => t.status === "pending" || !t.status),
    [thisMonthIncome]
  );

  const pendingTotal = useMemo(
    () => pendingTransactions.reduce((sum, t) => sum + Number(t.amount || 0), 0),
    [pendingTransactions]
  );

  const diff = totalIncome - lastTotal;
  const pct = lastTotal > 0 ? ((diff / lastTotal) * 100).toFixed(1) : null;
  const momLabel =
    pct !== null
      ? `${diff >= 0 ? "▲" : "▼"} $${Math.abs(diff).toLocaleString()} last month`
      : "No previous data";

  // ─── REVENUE MIX ──────────────────────────────────────
  const revenueMix = useMemo(
    () => buildRevenueMix(thisMonthIncome),
    [thisMonthIncome]
  );

  // Smart insight: top category
  const topCategory = revenueMix[0];

  // ─── ADD TRANSACTION ───────────────────────────────────
  const handleCreated = (tx: any) => {
    setTransactions((prev) => [tx, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <AppLayout title="Income" activePage="income">

        <div className="income-content">

          {/* ── HEADER ── */}
          <div className="income-header">
            <p className="income-subtitle">Monitor your business revenue and incoming cash flow.</p>
            <button className="add-income-btn" onClick={() => setIsModalOpen(true)}>
              + Add Income
            </button>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="income-stats">

            {/* Total Monthly Income */}
            <div className="income-stat-card">
              <p className="stat-label">TOTAL MONTHLY INCOME</p>
              <p className="stat-value green">
                {loading ? "Loading..." : `$${totalIncome.toLocaleString()}`}
              </p>
              <p className={`stat-change ${diff >= 0 ? "positive" : "negative"}`}>
                {momLabel}
              </p>
            </div>

            {/* Pending Payments */}
            <div className="income-stat-card">
              <p className="stat-label">PENDING PAYMENTS</p>
              <p className="stat-value orange">
                {loading ? "—" : `$${pendingTotal.toLocaleString()}`}
              </p>
              <p className="stat-invoices">
                {pendingTransactions.length} invoice{pendingTransactions.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Grow Your Business CTA */}
            <div className="income-stat-card grow-card">
              <p className="grow-title">Grow Your Business</p>
              <p className="grow-desc">
                Record new revenue or investment dividends to keep your books balanced
              </p>
              <button
                className="add-income-btn-sm"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Income
              </button>
            </div>

          </div>

          {/* ── TRANSACTIONS TABLE ── */}
          <div className="income-table-card">
            <div className="table-header-row">  
            </div>

            {loading ? (
              <div className="income-loading">Loading...</div>
            ) : (
              <IncomeTable transactions={thisMonthIncome} />
            )}
          </div>

          {/* ── REVENUE MIX + SMART INSIGHT ── */}
          <div className="revenue-row">

            <div className="revenue-mix-card">
              <h3>Revenue Mix</h3>
              <div className="revenue-mix-content">
                <RevenueMixChart data={revenueMix} />
                <div className="revenue-legend">
                  {revenueMix.map((item, i) => {
                    const colorClass = ["sales", "services", "investments"][i] ?? "sales";
                    return (
                      <div key={item.category} className="legend-item">
                        <span className={`legend-dot ${colorClass}`} />
                        <span className="legend-label">{item.category}</span>
                        <span className="legend-pct">{item.percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="smart-insight-card">
              <span className="insight-icon">📍</span>
              <p className="insight-title">SMART INSIGHT</p>
              <p className="insight-body">
                {topCategory
                  ? `${topCategory.category} revenue is up compared to last quarter. Consider allocating more resources to ${topCategory.category.toLowerCase()} delivery.`
                  : "Add income transactions to see personalized insights about your revenue mix."}
              </p>
            </div>

          </div>

        </div>
      </AppLayout>

      {isModalOpen && (
        <NewTransactionModal
          onClose={() => setIsModalOpen(false)}
          onTransactionCreated={handleCreated}
          defaultType="income"
        />
      )}
    </>
  );
}
