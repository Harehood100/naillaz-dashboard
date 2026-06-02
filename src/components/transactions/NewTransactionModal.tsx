"use client";
import { useState } from "react";

import "./NewTransactionModal.css";
import { X } from "lucide-react";

interface NewTransactionModalProps {
  onClose: () => void;
}

export default function NewTransactionModal({
  onClose,
}: NewTransactionModalProps) {
  const [transactionType, setTransactionType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Dining & Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");

  const formattedAmount = amount
    ? `$${parseFloat(amount).toFixed(2)}`
    : "$0.00";

  const handleSave = () => {
    // handle save logic here
    onClose();
  };

  return (
    <div className="transaction-modal-overlay" onClick={onClose}>
      <div
        className="transaction-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="transaction-modal-scroll">
          {/* Header */}
          <div className="transaction-modal-header">
            <h2>New Transaction</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="transaction-tabs">
            <button
              className={transactionType === "expense" ? "active" : ""}
              onClick={() => setTransactionType("expense")}
            >
              💸 Expense
            </button>
            <button
              className={transactionType === "income" ? "active" : ""}
              onClick={() => setTransactionType("income")}
            >
              💰 Income
            </button>
            <button
              className={transactionType === "transfer" ? "active" : ""}
              onClick={() => setTransactionType("transfer")}
            >
              ⇄ Transfer
            </button>
          </div>

          {/* Amount Card */}
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

          {/* Form Fields */}
          <div className="transaction-form">
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Dining & Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Health</option>
                  <option>Utilities</option>
                  <option>Housing</option>
                  <option>Other</option>
                </select>
              </div>

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
                placeholder=""
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="transaction-modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
