import AppLayout from "@/components/layout/AppLayout";

import StatCard from "@/components/dashboard/StatCard";
import SavingsProgress from "@/components/dashboard/SavingsProgress";
import TransactionTable from "@/components/dashboard/TransactionTable";
import AlertCard from "@/components/dashboard/AlertCard";

import "./dashboard.css";

export default function DashboardPage() {
  return (
    <AppLayout
      title="Dashboard"
      activePage="dashboard"
    >
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
    </AppLayout>
  );
}