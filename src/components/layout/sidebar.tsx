"use client";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard, Wallet, ReceiptText, PiggyBank,
  Bell, Settings, Plus, Menu, X,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import NewTransactionModal from "@/components/transactions/NewTransactionModal";

type SidebarProps = { activePage: string };

const navLinks = [
  { href: "/dashboard",     icon: LayoutDashboard, label: "Dashboard"     },
  { href: "/income",        icon: Wallet,           label: "Income"        },
  { href: "/expenses",      icon: ReceiptText,      label: "Expenses"      },
  { href: "/savings",       icon: PiggyBank,        label: "Savings"       },
  { href: "/notifications", icon: Bell,             label: "Notifications" },
  { href: "/settings",      icon: Settings,         label: "Settings"      },
];


export default function Sidebar({ activePage }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const [showTransactionModal, setShowTransactionModal] =
  useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sidebar-topbar">
        <div className="logo-badge">
          <Logo size="medium" />
          <span className="logo-text">NAILLAZ</span>
        </div>
        <button
          className="sidebar-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div>
          <div className="logo-section">
            <div className="logo-badge">
              <Logo size="medium" />
              <span className="logo-text">NAILLAZ</span>
            </div>
            <p className="logo-subtitle">✦ Financial Workspace</p>
          </div>

          <nav className="sidebar-nav">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={activePage === label.toLowerCase() ? "active-link" : ""}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <button 
        className="new-transaction-btn"
        onClick={() => setShowTransactionModal(true)}>
          <Plus size={18} />
          New Transaction
        </button>

        
      </aside>

      {showTransactionModal && (
  <NewTransactionModal
    onClose={() => setShowTransactionModal(false)}
  />
)}
    </>
  );
}