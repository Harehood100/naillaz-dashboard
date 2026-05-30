import Sidebar from "@/components/layout/sidebar";

import StatCard from "@/components/dashboard/StatCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import SavingsProgress from "@/components/dashboard/SavingsProgress";
import AlertCard from "@/components/dashboard/AlertCard";

import "./dashboard.css";

export default function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <p>
            Welcome back to your financial
            workspace.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Balance"
            amount="₦250,000"
          />

          <StatCard
            title="Income"
            amount="₦120,000"
          />

          <StatCard
            title="Expenses"
            amount="₦80,000"
          />

          <StatCard
            title="Savings"
            amount="₦50,000"
          />
        </div>

        <SavingsProgress />

        <TransactionTable />

        <AlertCard />
      </main>
    </div>
  );
}
