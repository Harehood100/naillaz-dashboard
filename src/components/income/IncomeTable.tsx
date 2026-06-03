const incomes = [
  { id: 1, description: "Stellar Tech Solutions",  source: "Services",    sourceType: "services",   date: "May 1, 2026",  amount: 30000,  cleared: true  },
  { id: 2, description: "Direct Sales - POS",       source: "Sales",       sourceType: "sales",      date: "May 5, 2026",  amount: 50000,  cleared: true  },
  { id: 3, description: "Vertex Global",            source: "Services",    sourceType: "services",   date: "May 8, 2026",  amount: 30000,  cleared: false },
  { id: 4, description: "Dividend Payout - ETF",    source: "INVESTMENTS", sourceType: "investment", date: "May 12, 2026", amount: 100000, cleared: true  },
  { id: 5, description: "Lumina Creatives",         source: "Services",    sourceType: "services",   date: "May 15, 2026", amount: 20000,  cleared: false },
  { id: 6, description: "Direct Sales - POS",       source: "Sales",       sourceType: "sales",      date: "May 18, 2026", amount: 100000, cleared: true  },
];

export default function IncomeTable() {
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
          {incomes.map((income) => (
            <tr key={income.id}>
              <td className="tx-date">{income.date}</td>
              <td className="tx-desc">{income.description}</td>
              <td>
                <span className={`category-badge category-${income.sourceType}`}>
                  {income.source}
                </span>
              </td>
              <td className="tx-status">
                {income.cleared
                  ? <span className="status-dot cleared"></span>
                  : <span className="status-ring"></span>
                }
                {income.cleared ? "Cleared" : "Pending"}
              </td>
              <td className="tx-amount">
                # {income.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
