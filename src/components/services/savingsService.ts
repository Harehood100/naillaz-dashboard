import { mockSavings } from '@/lib/mockData'

export const getSavingsGoals = async () => {
  return mockSavings
}

export const createSavingsGoal = async (data: any) => {
  console.log('Savings goal created:', data)
  return { success: true, data }
}

export const updateSavingsGoal = async (id: string, data: any) => {
  console.log('Savings goal updated:', id, data)
  return { success: true, data }
}

export const deleteSavingsGoal = async (id: string) => {
  console.log('Savings goal deleted:', id)
  return { success: true }
}