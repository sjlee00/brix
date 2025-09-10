'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Brix
          </Link>
          
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/expenses">
                  <Button variant="ghost">Expenses</Button>
                </Link>
                <Link href="/maintenance">
                  <Button variant="ghost">Maintenance</Button>
                </Link>
                <Link href="/property">
                  <Button variant="ghost">Property</Button>
                </Link>
                <Button variant="outline" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
