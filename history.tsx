"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2 } from "lucide-react"

interface HistoryProps {
  onBack: () => void
}

interface Entry {
  date: string
  text: string
  sentiment: "happy" | "sad" | "neutral"
}

export function History({ onBack }: HistoryProps) {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("moodEntries")
    if (stored) {
      setEntries(JSON.parse(stored).reverse())
    }
  }, [])

  const handleDelete = (index: number) => {
    const updated = entries.filter((_, i) => i !== index)
    setEntries(updated)
    localStorage.setItem("moodEntries", JSON.stringify(updated.reverse()))
  }

  const sentimentEmoji = {
    happy: "😊",
    sad: "😔",
    neutral: "😐",
  }

  const sentimentColor = {
    happy: "bg-yellow-100 text-yellow-700",
    sad: "bg-blue-100 text-blue-700",
    neutral: "bg-gray-100 text-gray-700",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen p-4 pb-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Your History</h1>
        </div>

        {/* Entries List */}
        {entries.length === 0 ? (
          <div className="bg-white/80 backdrop-blur rounded-3xl p-8 text-center">
            <p className="text-muted-foreground text-lg">No entries yet. Start journaling to see your mood history!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{sentimentEmoji[entry.sentiment]}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${sentimentColor[entry.sentiment]}`}
                      >
                        {entry.sentiment}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(entry.date)}</p>
                  </div>
                  <Button
                    onClick={() => handleDelete(index)}
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-foreground/80 text-sm line-clamp-2">{entry.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
