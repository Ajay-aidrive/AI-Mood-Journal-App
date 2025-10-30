"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react"

interface JournalProps {
  onBack: () => void
}

interface MoodAnalysis {
  sentiment: "happy" | "sad" | "neutral"
  insight: string
  habit: string
}

export function Journal({ onBack }: JournalProps) {
  const [text, setText] = useState("")
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      setAnalysis(data)

      // Save to localStorage
      const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]")
      entries.push({
        date: new Date().toISOString(),
        text,
        sentiment: data.sentiment,
      })
      localStorage.setItem("moodEntries", JSON.stringify(entries))
    } catch (error) {
      console.error("Error analyzing mood:", error)
    } finally {
      setLoading(false)
    }
  }

  const sentimentEmoji = {
    happy: "😊",
    sad: "😔",
    neutral: "😐",
  }

  const sentimentColor = {
    happy: "text-yellow-500",
    sad: "text-blue-500",
    neutral: "text-gray-500",
  }

  return (
    <div className="min-h-screen p-4 pb-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full btn-shadow">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Write Your Mood</h1>
        </div>

        {/* Input Section */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm">
          <label className="block text-sm font-semibold text-foreground mb-3">How are you feeling today?</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts, feelings, and experiences..."
            className="w-full h-40 p-4 rounded-2xl border-2 border-muted bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">{text.length} characters</p>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || loading}
          className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-shadow hover:shadow-xl transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze My Mood
            </>
          )}
        </Button>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-4xl ${sentimentColor[analysis.sentiment]}`}>
                  {sentimentEmoji[analysis.sentiment]}
                </span>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Mood</p>
                  <p className="text-xl font-bold text-foreground capitalize">{analysis.sentiment}</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 backdrop-blur rounded-3xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-2">💡 Insight</p>
              <p className="text-foreground/80 leading-relaxed">{analysis.insight}</p>
            </div>

            <div className="bg-accent/20 backdrop-blur rounded-3xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-2">🌱 Suggested Habit</p>
              <p className="text-foreground/80 leading-relaxed">{analysis.habit}</p>
            </div>

            <Button
              onClick={() => {
                setText("")
                setAnalysis(null)
              }}
              className="w-full h-12 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold border-2 border-primary/30 btn-shadow"
            >
              Write Another Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
