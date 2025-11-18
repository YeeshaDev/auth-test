export interface User {
  name: string
  email: string
  password: string
  createdAt: string
}

export interface OnboardingData {
  company: string
  role: string
  teamSize: string
  industry: string
  goals: string[]
}

export interface StatCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: string
}

export interface Activity {
  id: string
  type: string
  message: string
  timestamp: string
  icon: string
}
