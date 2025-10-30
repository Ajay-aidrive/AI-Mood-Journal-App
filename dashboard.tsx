"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Calendar, Smile } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface DashboardProps {
  onBack: () => void
}

interface MoodEntry {
  date: string
  text: string
  sentiment: "happy" | "sad" | "neutral"
}

export function Dashboard({ onBack }: DashboardProps) {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [stats, setStats] = useState({
    totalEntries: 0,
    happyCount: 0,
    sadCount: 0,
    neutralCount: 0,
    averageMood: "neutral" as "happy" | "sad" | "neutral",
  })

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")
    setEntries(storedEntries)

    // Calculate stats
    const happyCount = storedEntries.filter((e: MoodEntry) => e.sentiment === "happy").length
    const sadCount = storedEntries.filter((e: MoodEntry) => e.sentiment === "sad").length
    const neutralCount = storedEntries.filter((e: MoodEntry) => e.sentiment === "neutral").length

    let averageMood: "happy" | "sad" | "neutral" = "neutral"
    if (happyCount > sadCount && happyCount > neutralCount) {
      averageMood = "happy"
    } else if (sadCount > happyCount && sadCount > neutralCount) {
      averageMood = "sad"
    }

    setStats({
      totalEntries: storedEntries.length,
      happyCount,
      sadCount,
      neutralCount,
      averageMood,
    })
  }, [])

  // Prepare data for charts
  const moodDistribution = [
    { name: "Happy", value: stats.happyCount, color: "#fbbf24" },
    { name: "Sad", value: stats.sadCount, color: "#60a5fa" },
    { name: "Neutral", value: stats.neutralCount, color: "#9ca3af" },
  ].filter((item) => item.value > 0)

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dateStr = date.toISOString().split("T")[0]
    const dayEntries = entries.filter((e) => e.date.split("T")[0] === dateStr)
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      count: dayEntries.length,
    }
  })

  const sentimentEmoji = {
    happy: "😊",
    sad: "😔",
    neutral: "😐",
  }

  return (
    <div className="min-h-screen p-4 pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full btn-shadow">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Your Mood Analytics</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalEntries}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary/40" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Mood</p>
                <p className="text-2xl font-bold text-foreground capitalize">{stats.averageMood}</p>
              </div>
              <span className="text-4xl">{sentimentEmoji[stats.averageMood]}</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Streak</p>
                <p className="text-3xl font-bold text-primary">{entries.length > 0 ? "Active" : "Start"}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent/40" />
            </div>
          </div>
        </div>

        {/* Charts */}
        {stats.totalEntries > 0 ? (
          <div className="space-y-6">
            {/* Weekly Activity */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Mood Distribution */}
            {moodDistribution.length > 0 && (
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
                <h2 className="text-lg font-semibold text-foreground mb-4">Mood Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Mood Breakdown */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-foreground mb-4">Mood Breakdown</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">😊</span>
                    <span className="text-foreground">Happy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width: `${stats.totalEntries > 0 ? (stats.happyCount / stats.totalEntries) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-foreground w-8">{stats.happyCount}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">😔</span>
                    <span className="text-foreground">Sad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400"
                        style={{
                          width: `${stats.totalEntries > 0 ? (stats.sadCount / stats.totalEntries) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-foreground w-8">{stats.sadCount}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">😐</span>
                    <span className="text-foreground">Neutral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400"
                        style={{
                          width: `${stats.totalEntries > 0 ? (stats.neutralCount / stats.totalEntries) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-foreground w-8">{stats.neutralCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur rounded-2xl p-12 shadow-md text-center">
            <Smile className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No entries yet. Start journaling to see your mood analytics!</p>
          </div>
        )}
      </div>
    </div>
  )
}
