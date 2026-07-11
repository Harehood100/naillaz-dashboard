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
    { id: 1, description: "Amazon Web Service", category: "Software", date: "2026-06-24", amount: -156.00, type: "expense" },
    { id: 2, description: "The Bistro Downtown", category: "Dining", date: "2026-06-24", amount: -42.50, type: "expense" },
    { id: 3, description: "Direct Sales - POS", category: "Sales", date: "2026-06-23", amount: 3150.25, type: "income" },
    { id: 4, description: "Lufthansa Airlines", category: "Transport", date: "2026-06-22", amount: -840.00, type: "expense" },
    { id: 5, description: "Dividend Payout ETF", category: "Investment", date: "2026-06-21", amount: 420.00, type: "income" },
    { id: 6, description: "Lamina Creatives", category: "Freelance", date: "2026-06-20", amount: 3215.00, type: "income" },
    { id: 7, description: "Blue Bottle Coffee", category: "Dining", date: "2026-06-20", amount: -12.50, type: "expense" },
    { id: 8, description: "Shell Gasoline", category: "Transport", date: "2026-06-20", amount: -85.20, type: "expense" },
]

export const mockSavings = [
    { id: 1, name: "New Home Fund", currentAmount: 27500, targetAmount: 50000 },
    { id: 2, name: "Emergency Fund", currentAmount: 18000, targetAmount: 30000 },
    { id: 3, name: "New Laptop", currentAmount: 9500, targetAmount: 25000 },
]

export const mockExpenses = [
    { id: 1, description: "Office Rent", category: "Housing", date: "2026-06-01", amount: -3200 },
    { id: 2, description: "Team Lunch", category: "Dining", date: "2026-06-02", amount: -240 },
    { id: 3, description: "AWS Services", category: "Software", date: "2026-06-03", amount: -180 },
    { id: 4, description: "Uber to Client", category: "Transport", date: "2026-06-04", amount: -45 },
    { id: 5, description: "Adobe License", category: "Software", date: "2026-06-05", amount: -55 },
]

export const mockIncome = [
    { id: 1, description: "Client Project - ABC Corp", category: "Freelance", date: "2026-06-01", amount: 8000 },
    { id: 2, description: "Monthly Retainer", category: "Retainer", date: "2026-06-01", amount: 5000 },
    { id: 3, description: "Product Sales", category: "Sales", date: "2026-06-03", amount: 3200 },
    { id: 4, description: "Consulting Fee", category: "Consulting", date: "2026-06-05", amount: 2500 },
]