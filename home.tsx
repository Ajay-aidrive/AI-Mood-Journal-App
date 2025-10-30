"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, History, BarChart3 } from "lucide-react"

interface HomeProps {
  onNavigate: (page: "journal" | "history" | "dashboard") => void
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Mood Journal</h1>
          <p className="text-muted-foreground text-lg">Track your feelings and discover patterns with AI insights</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => onNavigate("journal")}
            className="w-full h-14 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Write Journal Entry
          </Button>
          <Button
            onClick={() => onNavigate("history")}
            variant="outline"
            className="w-full h-14 text-lg rounded-2xl border-2 border-secondary text-foreground hover:bg-secondary/10 font-semibold"
          >
            <History className="w-5 h-5 mr-2" />
            View History
          </Button>
          <Button
            onClick={() => onNavigate("dashboard")}
            variant="outline"
            className="w-full h-14 text-lg rounded-2xl border-2 border-accent text-foreground hover:bg-accent/10 font-semibold"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View Analytics
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <div className="bg-white/60 backdrop-blur rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">📝</div>
            <p className="text-sm text-muted-foreground mt-2">Daily Entries</p>
          </div>
          <div className="bg-white/60 backdrop-blur rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-accent">✨</div>
            <p className="text-sm text-muted-foreground mt-2">AI Insights</p>
          </div>
        </div>
      </div>
    </div>
  )
}
