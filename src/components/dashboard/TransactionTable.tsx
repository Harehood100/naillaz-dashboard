export default function TransactionTable() {
  const transactions = [
    {
      name: "Food Purchase",
      amount: "₦15,000",
      status: "Completed",
    },
    {
      name: "Transport",
      amount: "₦8,000",
      status: "Completed",
    },
    {
      name: "Electricity Bill",
      amount: "₦22,000",
      status: "Pending",
    },
  ];

  return (
    <div className="table-card">
      <h3>Recent Transactions</h3>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
