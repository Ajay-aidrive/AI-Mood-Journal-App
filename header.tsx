"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
}

interface HeaderProps {
  user?: User
  onLogout?: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const auth = useAuth()
  const currentUser = user || auth.user
  const handleLogout = () => {
    auth.logout()
    onLogout?.()
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">AI Mood Journal</h1>
        {currentUser && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Welcome, {currentUser.name}</span>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="rounded-lg btn-shadow">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
