"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ExpensesTable from "@/components/expenses/ExpensesTable";
import ExpensesChart from "@/components/expenses/ExpensesChart";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";
import "./expenses.css";

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AppLayout title="Expenses Analytics" activePage="expenses">
        <div className="expenses-content">
          <div className="expenses-header">
            <h2>Track and manage your spending</h2>
            <button
              className="add-expense-btn"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Expense
            </button>
          </div>

          {/* Stat Cards */}
          <div className="expenses-stats">
            <div className="expense-stat-card">
              <p className="stat-label">Total This Month</p>
              <p className="stat-value">$12,450.00</p>
              <p className="stat-change negative">↑ 8.2% from last month</p>
            </div>
            <div className="expense-stat-card">
              <p className="stat-label">Largest Category</p>
              <p className="stat-value">Housing</p>
              <p className="stat-change">$3,200 spent</p>
            </div>
            <div className="expense-stat-card">
              <p className="stat-label">Transactions</p>
              <p className="stat-value">34</p>
              <p className="stat-change">This month</p>
            </div>
            <div className="expense-stat-card">
              <p className="stat-label">Budget Remaining</p>
              <p className="stat-value">$2,550.00</p>
              <p className="stat-change positive">↓ On track</p>
            </div>
          </div>

          {/* Chart */}
          <ExpensesChart />

          {/* Table */}
          <ExpensesTable />
        </div>
      </AppLayout>

      {isModalOpen && (
        <NewTransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
