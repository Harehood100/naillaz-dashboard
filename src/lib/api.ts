import { mockSummary } from './mockData'

export const dashboardAPI = {
  getSummary: async () => mockSummary,
  getAnalytics: async () => ({}),
  getSettings: async () => ({}),
}

export const authAPI = {
  login: async (body: any) => {
    // Simulate login — accept any credentials
    return {
      token: 'mock-token-12345',
      user: {
        id: '1',
        firstName: 'Bolaji',
        lastName: 'Bakare',
        email: body.email,
      }
    }
  },
  signup: async (body: any) => {
    return { message: 'Account created successfully' }
  },
}