import { mockSavings } from '@/lib/mockData'

export type SavingsGoal = {
  _id: string
  goalName: string
  goalType: string
  targetAmount: number
  targetDate: string
  monthlyContribution: number
  linkedAccount: string
  currentAmount: number
  createdAt: string
}

export const getSavingsGoals = async (): Promise<SavingsGoal[]> => {
  // Map mockSavings shape to SavingsGoal shape
  return mockSavings.map((g) => ({
    _id: String(g.id),
    goalName: g.name,
    goalType: 'custom',
    targetAmount: g.targetAmount,
    targetDate: '',
    monthlyContribution: 0,
    linkedAccount: '',
    currentAmount: g.currentAmount,
    createdAt: new Date().toISOString(),
  }))
}

export const createSavingsGoal = async (
  data: Omit<SavingsGoal, '_id' | 'createdAt' | 'currentAmount'>
): Promise<SavingsGoal> => {
  console.log('Savings goal created:', data)
  return {
    _id: Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
    currentAmount: 0,
    ...data,
  }
}

export const updateSavingsGoal = async (
  id: string,
  data: Partial<SavingsGoal>
): Promise<SavingsGoal> => {
  console.log('Savings goal updated:', id, data)
  return { _id: id, ...data } as SavingsGoal
}

export const deleteSavingsGoal = async (id: string): Promise<{ success: boolean }> => {
  console.log('Savings goal deleted:', id)
  return { success: true }
}
