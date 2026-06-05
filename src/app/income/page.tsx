"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import IncomeTable from "@/components/income/IncomeTable";
import NewTransactionModal, {
  TransactionData,
} from "@/components/transactions/NewTransactionModal";
import RevenueMixChart from "@/components/income/RevenueMixChart";
import "./income.css";
import {
  getIncomeSummary,
  getTransactions,
} from "@/components/services/transactionService";

// ─── Types ────────────────────────────────────────────────────────────────────

type RevenueMixItem = {
  category: string;
  amount: number;
  percentage: number;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IncomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Raw income transactions — drives IncomeTable
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  // Summary from backend — drives stat cards + revenue mix chart
  const [incomeSummary, setIncomeSummary] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  // ── Load both on mount (and after login since useEffect re-runs) ────────────
  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);

        const [allRes, summaryRes] = await Promise.all([
          getTransactions(),  // GET /expenses — all saved transactions
          getIncomeSummary(), // GET /transactions/income-summary
        ]);

        // Normalise: backend may return { data: [...] } or a plain array
        const all: TransactionData[] = Array.isArray(allRes?.data)
          ? allRes.data
          : Array.isArray(allRes)
          ? allRes
          : [];

        // Filter to income only on the client since there's no dedicated endpoint
        const incomeOnly = all.filter((t) => t.type === "income");

        setTransactions(incomeOnly);

        // Summary: backend returns { success, data: { totalIncome, revenueMix } }
        setIncomeSummary(summaryRes?.data ?? summaryRes ?? null);

      } catch (err) {
        console.error("Failed to load income data:", err);
        setTransactions([]);
        setIncomeSummary(null);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  // ── After modal saves, prepend optimistically + refresh summary ─────────────
  const handleTransactionCreated = async (newTransaction: TransactionData) => {
    // Prepend immediately so the table updates without waiting for a refetch
    setTransactions((prev) => [newTransaction, ...prev]);

    // Re-fetch summary so totalIncome + revenueMix stay accurate
    try {
      const summaryRes = await getIncomeSummary();
      setIncomeSummary(summaryRes?.data ?? summaryRes ?? null);
    } catch (err) {
      console.error("Failed to refresh income summary:", err);
    }

    setIsModalOpen(false);
  };

  // ── Derived values ──────────────────────────────────────────────────────────
  const totalIncome: number = incomeSummary?.totalIncome ?? 0;
  const revenueMix: RevenueMixItem[] = incomeSummary?.revenueMix ?? [];
  const topCategory = revenueMix[0] ?? null;

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <AppLayout title="Income" activePage="income">
        <div className="income-content">

          {/* ── Header ── */}
          <div className="income-header">
            <p className="income-subtitle">
              Monitor your business revenue and incoming cash flow.
            </p>
            <button
              className="add-income-btn"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Income
            </button>
          </div>

          {/* ── Stat Cards ── */}
          <div className="income-stats">
            <div className="income-stat-card">
              <p className="stat-label">TOTAL MONTHLY INCOME</p>
              <p className="stat-value green">
                ${totalIncome.toLocaleString()}
              </p>
              <p className="stat-change">vs. last month</p>
            </div>

            <div className="income-stat-card">
              <p className="stat-label">REVENUE SOURCES</p>
              <p className="stat-value orange">
                {revenueMix.length}
              </p>
              <p className="stat-invoices">categories</p>
            </div>

            <div className="income-stat-card grow-card">
              <p className="grow-title">Grow Your Business</p>
              <p className="grow-desc">
                Record new revenue or investment income
              </p>
              <button
                className="add-income-btn-sm"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Income
              </button>
            </div>
          </div>

          {/* ── Recent Transactions Table ── */}
          {loading ? (
            <div className="income-loading">Loading transactions…</div>
          ) : (
            <IncomeTable transactions={transactions} />
          )}

          {/* ── Revenue Mix ── */}
          <div className="revenue-row">
            <div className="revenue-mix-card">
              <h3>Revenue Mix</h3>

              <div className="revenue-mix-content">
                <RevenueMixChart data={revenueMix} />

                <div className="revenue-legend">
                  {revenueMix.length === 0 ? (
                    <p className="legend-empty">No income recorded yet.</p>
                  ) : (
                    revenueMix.map((item: RevenueMixItem, idx: number) => (
                      <div className="legend-item" key={idx}>
                        <span className="legend-label">{item.category}</span>
                        <span className="legend-pct">{item.percentage}%</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="smart-insight-card">
              <div className="insight-icon">📍</div>
              <p className="insight-title">SMART INSIGHT</p>
              <p className="insight-body">
                {topCategory
                  ? `${topCategory.category} is your top income source at ${topCategory.percentage}% of total revenue. Consider scaling that category.`
                  : "Add income entries to see smart insights about your revenue mix."}
              </p>
            </div>
          </div>

        </div>
      </AppLayout>

      {/* ── Modal ── */}
      {isModalOpen && (
        <NewTransactionModal
          onClose={() => setIsModalOpen(false)}
          onTransactionCreated={handleTransactionCreated}
          defaultType="income"
        />
      )}
    </>
  );
}
