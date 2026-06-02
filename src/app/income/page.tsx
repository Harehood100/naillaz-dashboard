"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import IncomeTable from "@/components/income/IncomeTable";
import IncomeChart from "@/components/income/IncomeChart";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import "./income.css";

export default function IncomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AppLayout title="Income Overview" activePage="income">
        <div className="income-content">
          <div className="income-header">
            <h2>Monitor your revenue and incoming cash flow</h2>
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
              <p className="stat-label">Total This Month</p>
              <p className="stat-value">$28,500.00</p>
              <p className="stat-change positive">↑ 12.5% from last month</p>
            </div>
            <div className="income-stat-card">
              <p className="stat-label">Largest Source</p>
              <p className="stat-value">Client Work</p>
              <p className="stat-change">$18,000 earned</p>
            </div>
            <div className="income-stat-card">
              <p className="stat-label">Transactions</p>
              <p className="stat-value">12</p>
              <p className="stat-change">This month</p>
            </div>
            <div className="income-stat-card">
              <p className="stat-label">Net Profit</p>
              <p className="stat-value">$16,050.00</p>
              <p className="stat-change positive">After expenses</p>
            </div>
          </div>

          {/* Chart */}
          <IncomeChart />

          {/* Table */}
          <IncomeTable />
        </div>
      </AppLayout>

      {isModalOpen && (
        <NewTransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
