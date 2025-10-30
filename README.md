# AI Mood Journal

A beautiful, mobile-first web app that helps you track your daily mood and get AI-powered insights about your emotional patterns.

## Features

- 📝 **Daily Journal Entries**: Write freely about your feelings and experiences
- ✨ **AI Mood Analysis**: Get instant sentiment analysis (happy, sad, neutral)
- 💡 **Personalized Insights**: Receive thoughtful reflections on your mood
- 🌱 **Suggested Habits**: Get actionable suggestions for emotional wellness
- 📊 **History Tracking**: View all your past entries and mood patterns
- 💾 **Local Storage**: All data is stored locally on your device for privacy

## Tech Stack

- **Framework**: Next.js 16 with React
- **Styling**: Tailwind CSS v4 with custom pastel theme
- **Storage**: Browser LocalStorage
- **Icons**: Lucide React

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Home Screen
- Click "Write Journal Entry" to start journaling
- Click "View History" to see your past entries

### Journal Screen
- Write about your feelings and experiences
- Click "Analyze My Mood" to get AI insights
- View your sentiment, personalized insight, and suggested habit
- Save entries automatically to your history

### History Screen
- View all your past journal entries
- See the date, mood sentiment, and text preview
- Delete entries you no longer want to keep

## API Routes

### POST `/api/analyze`
Analyzes the mood from journal text.

**Request:**
\`\`\`json
{
  "text": "Your journal entry text here"
}
\`\`\`

**Response:**
\`\`\`json
{
  "sentiment": "happy" | "sad" | "neutral",
  "insight": "Personalized insight about your mood",
  "habit": "Suggested habit for emotional wellness"
}
\`\`\`

## Future Enhancements

- Integration with OpenAI API for more sophisticated mood analysis
- Mood trends and statistics dashboard
- Export journal entries as PDF
- Dark mode support
- Multi-language support
- Cloud sync across devices

## Privacy

All your journal entries are stored locally in your browser. No data is sent to external servers unless you explicitly configure an API integration.

## License

MIT
