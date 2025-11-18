import { Activity, StatCard } from "@/types"

 export const stats: StatCard[] = [
    { title: 'Total Users', value: '2,543', change: '+12.5%', trend: 'up', icon: 'users' },
    { title: 'Active Projects', value: '18', change: '+3.2%', trend: 'up', icon: 'briefcase' },
    { title: 'Conversion Rate', value: '64.3%', change: '-2.1%', trend: 'down', icon: 'target' },
    { title: 'Revenue Growth', value: '+28.4%', change: '+5.7%', trend: 'up', icon: 'trending' },
  ]

  export const activities: Activity[] = [
    { id: '1', type: 'success', message: 'Successfully completed onboarding process', timestamp: '2 hours ago', icon: 'check' },
    { id: '2', type: 'user', message: 'New team member joined your workspace', timestamp: '5 hours ago', icon: 'user' },
    { id: '3', type: 'settings', message: 'Updated account security settings', timestamp: '1 day ago', icon: 'settings' },
    { id: '4', type: 'user', message: '3 new users signed up for your service', timestamp: '2 days ago', icon: 'user' },
    { id: '2', type: 'user', message: 'New team member joined your workspace', timestamp: '5 hours ago', icon: 'user' },
  ]