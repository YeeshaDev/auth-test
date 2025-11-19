import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { BellIcon } from 'lucide-react'

function Navbar() {
    const router = useRouter()
    const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    localStorage.removeItem('onboarding')
    router.push('/')
  }
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">AuthTest</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mr-10 2xl:mr-0">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full">
                <BellIcon className="w-5 h-5" />
              </Button>
              <Button onClick={handleLogout} variant="outline" className="rounded-full">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Navbar
