import Link from "next/link";

import {
  LayoutDashboard,
  Wallet,
  ReceiptText,
  PiggyBank,
  Bell,
  Settings,
  Plus,
} from "lucide-react";

type SidebarProps = {
  activePage: string;
};

export default function Sidebar({
  activePage,
}: SidebarProps) {

  return (
    <aside className="sidebar">
      <div>
  <div className="logo-section">
    <div className="logo-badge">
      <span className="logo-text">NAILLAZ</span>
    </div>

    <p className="logo-subtitle">
     ✦ Financial Workspace
    </p>
  </div>

  <nav className="sidebar-nav">
     <Link
  href="/dashboard"
  className={
    activePage === "dashboard"
      ? "active-link"
      : ""
      }
    >
      <LayoutDashboard size={18} />
      Dashboard
    </Link> 

            <Link
          href="/income"
          className={
            activePage === "income"
              ? "active-link"
              : ""
          }
        >
          <Wallet size={18} />
          Income
        </Link>

        <Link
          href="/expenses"
          className={
            activePage === "expenses"
              ? "active-link"
              : ""
          }
        >
          <ReceiptText size={18} />
          Expenses
        </Link>

        <Link
          href="/savings"
          className={
            activePage === "savings"
              ? "active-link"
              : ""
          }
        >
          <PiggyBank size={18} />
          Savings
        </Link>

        <Link
          href="/notifications"
          className={
            activePage === "notifications"
              ? "active-link"
              : ""
          }
        >
          <Bell size={18} />
          Notifications
        </Link>

        <Link
          href="/settings"
          className={
            activePage === "settings"
              ? "active-link"
              : ""
          }
        >
          <Settings size={18} />
          Settings
        </Link>

  </nav>
</div>


     <button className="new-transaction-btn">
  <Plus size={18} />
  New Transaction
</button> 
    </aside>
  );
}