"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import IncomeTable from "@/components/income/IncomeTable";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import RevenueMixChart from "@/components/income/RevenueMixChart";
import "./income.css";

export default function IncomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AppLayout title="Income" activePage="income">
        <div className="income-content">

          {/* Page Header */}
          <div className="income-header">
            <div>
          
              <p className="income-subtitle">Monitor your business revenue and incoming cash flow.</p>
            </div>
            <button className="add-income-btn" onClick={() => setIsModalOpen(true)}>
              + Add Income
            </button>
          </div>

          {/* Stat Cards Row */}
          <div className="income-stats">
            <div className="income-stat-card">
              <p className="stat-label">TOTAL MONTHLY INCOME</p>
              <p className="stat-value green">$1,000,000</p>
              <p className="stat-change">vs. $800,000 last month</p>
            </div>

            <div className="income-stat-card">
              <p className="stat-label">PENDING PAYMENTS</p>
              <p className="stat-value orange">$50,000</p>
              <p className="stat-invoices">6 invoices</p>
            </div>

            <div className="income-stat-card grow-card">
              <p className="grow-title">Grow Your Business</p>
              <p className="grow-desc">
                Record new revenue or investment dividends to keep your books balanced
              </p>
              <button className="add-income-btn-sm" onClick={() => setIsModalOpen(true)}>
                + Add Income
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <IncomeTable />

          {/* Revenue Mix + Smart Insight */}
          <div className="revenue-row">
            <div className="revenue-mix-card">
              <h3>Revenue Mix</h3>
              <div className="revenue-mix-content">
                <RevenueMixChart />
                <div className="revenue-legend">
                  <div className="legend-item">
                    <span className="legend-dot sales"></span>
                    <span className="legend-label">Sales</span>
                    <span className="legend-pct">50%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot services"></span>
                    <span className="legend-label">Services</span>
                    <span className="legend-pct">35%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot investments"></span>
                    <span className="legend-label">Investments</span>
                    <span className="legend-pct">15%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="smart-insight-card">
              <div className="insight-icon">📍</div>
              <p className="insight-title">SMART INSIGHT</p>
              <p className="insight-body">
                Service revenue is up by 18% compared to last quarter. Consider allocating more resources to service delivery.
              </p>
            </div>
          </div>

        </div>
      </AppLayout>

      {isModalOpen && (
        <NewTransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
