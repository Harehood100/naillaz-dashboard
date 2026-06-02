const incomes = [
  { id: 1, description: "Client Project - ABC Corp", source: "Freelance", date: "Jun 1, 2026", amount: 8000 },
  { id: 2, description: "Monthly Retainer - XYZ Ltd", source: "Retainer", date: "Jun 1, 2026", amount: 5000 },
  { id: 3, description: "Product Sales", source: "Sales", date: "Jun 3, 2026", amount: 3200 },
  { id: 4, description: "Consulting Fee", source: "Consulting", date: "Jun 5, 2026", amount: 2500 },
  { id: 5, description: "Affiliate Commission", source: "Passive", date: "Jun 7, 2026", amount: 800 },
];

export default function IncomeTable() {
  return (
    <div className="income-table-card">
      <h3>Income Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Source</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id}>
              <td>{income.description}</td>
              <td>
                <span
                  className="category-badge"
                  style={{ background: "#22c55e20", color: "#22c55e" }}
                >
                  {income.source}
                </span>
              </td>
              <td style={{ color: "#9ca3af" }}>{income.date}</td>
              <td className="amount-positive">
                +${income.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
