"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import IncomeTable from "@/components/income/IncomeTable";
import NewTransactionModal, { TransactionData } from "@/components/transactions/NewTransactionModal";
import RevenueMixChart from "@/components/income/RevenueMixChart";
import "./income.css";
import api from "@/utils/api";

export default function IncomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ FIX: summary data (NOT transactions array)
  const [incomeSummary, setIncomeSummary] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIncomeSummary = async () => {
      try {
        const res = await api.get("/transactions/income-summary");

        // backend returns { success, data: {...} }
        setIncomeSummary(res.data.data);
      } catch (error) {
        console.error("Failed to fetch income summary:", error);
        setIncomeSummary({
          totalIncome: 0,
          revenueMix: [],
        });
      } finally {
        setLoading(false);
      }
    };

    loadIncomeSummary();
  }, []);

  const handleTransactionCreated = (_newTransaction: TransactionData) => {
    // optional: refresh summary after new income
    setIsModalOpen(false);
  };

  // ✅ FIX: safe fallback array (NO filter, NO crash)
  const revenueMix = incomeSummary?.revenueMix || [];

  return (
    <>
      <AppLayout title="Income" activePage="income">
        <div className="income-content">

          {/* Header */}
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

          {/* Stat Cards */}
          <div className="income-stats">
            <div className="income-stat-card">
              <p className="stat-label">TOTAL MONTHLY INCOME</p>
              <p className="stat-value green">
                ${incomeSummary?.totalIncome || 0}
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

          {/* Revenue Table */}
          <IncomeTable transactions={revenueMix} />

          {/* Revenue Mix Chart */}
          <div className="revenue-row">
            <div className="revenue-mix-card">
              <h3>Revenue Mix</h3>

              <div className="revenue-mix-content">
                <RevenueMixChart data={revenueMix} />

                <div className="revenue-legend">
                  {revenueMix.map((item: any, idx: number) => (
                    <div className="legend-item" key={idx}>
                      <span className="legend-label">
                        {item.category}
                      </span>
                      <span className="legend-pct">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="smart-insight-card">
              <div className="insight-icon">📍</div>
              <p className="insight-title">SMART INSIGHT</p>
              <p className="insight-body">
                Service revenue is growing. Consider scaling that category.
              </p>
            </div>
          </div>

        </div>
      </AppLayout>

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