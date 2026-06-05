import { TransactionData } from "../transactions/NewTransactionModal";

interface Props {
  transactions: TransactionData[];
}

// Map category names to CSS badge classes already in your stylesheet
const SOURCE_TYPE_MAP: Record<string, string> = {
  Salary:     "services",
  Freelance:  "services",
  Business:   "sales",
  Investment: "investment",
  Gift:       "sales",
  Refund:     "sales",
  Other:      "services",
};

function formatDate(t: any): string {
  // Backend may return the date under different field names
  const raw = t.date ?? t.createdAt ?? t.created_at ?? t.transactionDate ?? "";
  if (!raw) return "—";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function IncomeTable({ transactions }: Props) {
  return (
    <div className="income-table-card">
      <div className="table-header-row">
        <h3>Recent Transactions</h3>
        <a href="#" className="view-all-link">View All</a>
      </div>
      <table className="income-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>DESCRIPTION</th>
            <th>CATEGORY</th>
            <th>STATUS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="tx-empty">
                No income transactions yet.
              </td>
            </tr>
          ) : (
            transactions.map((t: any, i: number) => {
              const sourceType = SOURCE_TYPE_MAP[t.category] ?? "services";
              const cleared = t.status === "Cleared";

              return (
                <tr key={t.id ?? i}>
                  <td className="tx-date">{formatDate(t)}</td>
                  <td className="tx-desc">{t.description ?? "—"}</td>
                  <td>
                    <span className={`category-badge category-${sourceType}`}>
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <div className="tx-status">
                      {cleared
                        ? <span className="status-dot cleared"></span>
                        : <span className="status-ring"></span>
                      }
                      {cleared ? "Cleared" : "Pending"}
                    </div>
                  </td>
                  <td className="tx-amount">
                    ${Number(t.amount).toLocaleString()}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
