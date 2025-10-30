"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { Home } from "@/components/home"
import { Journal } from "@/components/journal"
import { History } from "@/components/history"
import { Dashboard } from "@/components/dashboard"
import { Header } from "@/components/header"
import { Login } from "@/components/login"
import { Signup } from "@/components/signup"

type Page = "home" | "journal" | "history" | "dashboard"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return authMode === "login" ? (
      <Login onSwitchToSignup={() => setAuthMode("signup")} />
    ) : (
      <Signup onSwitchToLogin={() => setAuthMode("login")} />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Header user={user} onLogout={() => setCurrentPage("home")} />
      {currentPage === "home" && <Home onNavigate={setCurrentPage} />}
      {currentPage === "journal" && <Journal onBack={() => setCurrentPage("home")} />}
      {currentPage === "history" && <History onBack={() => setCurrentPage("home")} />}
      {currentPage === "dashboard" && <Dashboard onBack={() => setCurrentPage("home")} />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
