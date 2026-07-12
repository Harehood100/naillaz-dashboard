import { mockSavings } from '@/lib/mockData'

// Export the type so other files can use it
export type SavingsGoal = {
  id: number
  name: string
  currentAmount: number
  targetAmount: number
}

export const getSavingsGoals = async (): Promise<SavingsGoal[]> => {
  return mockSavings
}

export const createSavingsGoal = async (data: any): Promise<{ success: boolean; data: any }> => {
  console.log('Savings goal created:', data)
  return { success: true, data }
}

export const updateSavingsGoal = async (id: string, data: any): Promise<{ success: boolean; data: any }> => {
  console.log('Savings goal updated:', id, data)
  return { success: true, data }
}

export const deleteSavingsGoal = async (id: string): Promise<{ success: boolean }> => {
  console.log('Savings goal deleted:', id)
  return { success: true }
}