const expenses = [
  { id: 1, description: "Office Rent", category: "Housing", date: "Jun 1, 2026", amount: -3200, color: "#3b82f6" },
  { id: 2, description: "Team Lunch", category: "Dining & Food", date: "Jun 2, 2026", amount: -240, color: "#f59e0b" },
  { id: 3, description: "AWS Services", category: "Utilities", date: "Jun 3, 2026", amount: -180, color: "#8b5cf6" },
  { id: 4, description: "Uber to Client", category: "Transport", date: "Jun 4, 2026", amount: -45, color: "#10b981" },
  { id: 5, description: "Adobe License", category: "Software", date: "Jun 5, 2026", amount: -55, color: "#ef4444" },
  { id: 6, description: "Office Supplies", category: "Shopping", date: "Jun 6, 2026", amount: -320, color: "#f59e0b" },
];

export default function ExpensesTable() {
  return (
    <div className="expenses-table-card">
      <h3>Recent Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>
                <span
                  className="category-badge"
                  style={{
                    background: `${expense.color}20`,
                    color: expense.color
                  }}
                >
                  {expense.category}
                </span>
              </td>
              <td style={{ color: "#9ca3af" }}>{expense.date}</td>
              <td className="amount-negative">
                ${Math.abs(expense.amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
