import { mockTransactions } from '@/lib/mockData'

export const getTransactions = async () => {
  // Return mock data — no backend needed
  return mockTransactions
}

export const createTransaction = async (data: any) => {
  console.log('Transaction created:', data)
  return { success: true, data }
}

export const updateTransaction = async (id: string, data: any) => {
  console.log('Transaction updated:', id, data)
  return { success: true, data }
}

export const deleteTransaction = async (id: string) => {
  console.log('Transaction deleted:', id)
  return { success: true }
}