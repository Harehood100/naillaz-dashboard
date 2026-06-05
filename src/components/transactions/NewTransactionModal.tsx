"use client";

import { useState } from "react";
import { X } from "lucide-react";
import "./NewTransactionModal.css";
import {
  createExpense,
} from "@/components/services/transactionService";

export type TransactionData = {
  type: "income" | "expense" | "transfer";
  amount: number;
  category: string;
  description: string;
  account: string;
  status?: string;
  date: string;
};

interface NewTransactionModalProps {
  onClose: () => void;
  onTransactionCreated?: (transaction: TransactionData) => void;
  defaultType?: "expense" | "income" | "transfer";
  type?: "expense" | "income" | "transfer";
}

// ─── Category options per transaction type ────────────────────────────────────
// Expense categories match CATEGORY_COLORS in ExpensesPage exactly.
// Income categories are common income sources.

const EXPENSE_CATEGORIES = [
  "Food",
  "Rent",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Education",
  "Other",
];

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Gift",
  "Refund",
  "Other",
];

const TRANSFER_CATEGORIES = [
  "Bank Transfer",
  "Savings",
  "Investment",
  "Other",
];

function getCategoriesForType(type: string) {
  if (type === "income") return INCOME_CATEGORIES;
  if (type === "transfer") return TRANSFER_CATEGORIES;
  return EXPENSE_CATEGORIES; // default: expense
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NewTransactionModal({
  onClose,
  onTransactionCreated,
  defaultType = "expense",
  type,
}: NewTransactionModalProps) {
  const [transactionType, setTransactionType] = useState(
    type ?? defaultType
  );

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(
    getCategoriesForType(type ?? defaultType)[0]
  );
  const [date, setDate] = useState(
    // Default to today's date
    new Date().toISOString().split("T")[0]
  );
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("Main Account");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // When the user switches tabs, reset category to the first option for that type
  const handleTypeChange = (newType: "expense" | "income" | "transfer") => {
    setTransactionType(newType);
    setCategory(getCategoriesForType(newType)[0]);
    setError("");
  };

  const handleSave = async () => {
    setError("");

    // ── Validation ──
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!description.trim()) {
      setError("Please add a description.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        type: transactionType,
        category,
        description,
        account,
        amount: Number(amount),
        date,           // ← previously missing; required for weekly trend chart
        status: "Cleared",
      };

      // All types go through createExpense (POST /expenses/add)
      // so every transaction is fetchable via getTransactions (GET /expenses)
      const res = await createExpense(payload);

      // Normalise: some backends wrap the record in { data: {...} }
      const saved: TransactionData = res?.data ?? res;

      onTransactionCreated?.(saved);
      onClose();
    } catch (err: any) {
      console.error("Transaction error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save transaction.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const categories = getCategoriesForType(transactionType);

  return (
    <div className="transaction-modal-overlay" onClick={onClose}>
      <div
        className="transaction-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="transaction-modal-scroll">
          {/* ── Header ── */}
          <div className="transaction-modal-header">
            <h2>New Transaction</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* ── Tabs ── */}
          {/* Hide tabs when the parent locks the type via the `type` prop */}
          {!type && (
            <div className="transaction-tabs">
              <button
                className={transactionType === "expense" ? "active" : ""}
                onClick={() => handleTypeChange("expense")}
              >
                💸 Expense
              </button>
              <button
                className={transactionType === "income" ? "active" : ""}
                onClick={() => handleTypeChange("income")}
              >
                💰 Income
              </button>
              <button
                className={transactionType === "transfer" ? "active" : ""}
                onClick={() => handleTypeChange("transfer")}
              >
                ⇄ Transfer
              </button>
            </div>
          )}

          {/* ── Amount ── */}
          <div className="amount-card">
            <span>Amount</span>
            <input
              className="amount-input"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* ── Form ── */}
          <div className="transaction-form">
            <div className="form-row">
              {/* Category — options change based on transaction type */}
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Date — now included in payload */}
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="What was this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Account</label>
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="transaction-error">{error}</div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="transaction-modal-footer">
          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
