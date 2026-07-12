export const mockUser = {
    id: "1",
    firstName: "Bolaji",
    lastName: "Bakare",
    email: "bolajibakare498@gmail.com",
}

export const mockSummary = {
    totalBalance: 45285.90,
    monthlyIncome: 12400.00,
    monthlyExpenses: 6842.15,
    incomeTarget: 15000,
    expenseBudget: 12000,
}

export const mockTransactions = [
    // EXPENSES
    { id: 1, description: "Amazon Web Service", category: "Software", date: "2026-07-01", amount: 156.00, type: "expense" },
    { id: 2, description: "The Bistro Downtown", category: "Food", date: "2026-07-02", amount: 42.50, type: "expense" },
    { id: 3, description: "Lufthansa Airlines", category: "Transport", date: "2026-07-05", amount: 840.00, type: "expense" },
    { id: 4, description: "Blue Bottle Coffee", category: "Food", date: "2026-07-08", amount: 12.50, type: "expense" },
    { id: 5, description: "Shell Gasoline", category: "Transport", date: "2026-07-10", amount: 85.20, type: "expense" },
    { id: 6, description: "Netflix Subscription", category: "Entertainment", date: "2026-07-11", amount: 15.99, type: "expense" },
    { id: 7, description: "Electricity Bill", category: "Utilities", date: "2026-07-03", amount: 120.00, type: "expense" },
    { id: 8, description: "Gym Membership", category: "Health", date: "2026-07-06", amount: 45.00, type: "expense" },
    { id: 9, description: "Office Rent", category: "Rent", date: "2026-07-01", amount: 3200.00, type: "expense" },
    { id: 10, description: "Adobe License", category: "Software", date: "2026-07-04", amount: 54.99, type: "expense" },

    // INCOME
    { id: 11, description: "Direct Sales - POS", category: "Sales", date: "2026-07-01", amount: 3150.25, type: "income" },
    { id: 12, description: "Dividend Payout ETF", category: "Investment", date: "2026-07-05", amount: 420.00, type: "income" },
    { id: 13, description: "Lamina Creatives", category: "Freelance", date: "2026-07-08", amount: 3215.00, type: "income" },
    { id: 14, description: "Client Retainer", category: "Retainer", date: "2026-07-01", amount: 5000.00, type: "income" },
    { id: 15, description: "Consulting Fee", category: "Consulting", date: "2026-07-10", amount: 2500.00, type: "income" },
]

export const mockSavings = [
    { id: 1, name: "New Home Fund", currentAmount: 27500, targetAmount: 50000 },
    { id: 2, name: "Emergency Fund", currentAmount: 18000, targetAmount: 30000 },
    { id: 3, name: "New Laptop", currentAmount: 9500, targetAmount: 25000 },
]

export const mockExpenses = mockTransactions.filter(t => t.type === "expense")
export const mockIncome = mockTransactions.filter(t => t.type === "income")
