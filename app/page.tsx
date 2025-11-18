import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-balance">Welcome to AuthTest</h1>
          <p className="text-muted-foreground text-pretty">
            A complete authentication and onboarding experience
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-center text-muted-foreground">
            <Link href="/forgot-password" className="hover:text-foreground underline underline-offset-4">
              Forgot your password?
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
