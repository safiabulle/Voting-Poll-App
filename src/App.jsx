import { useState, useEffect } from 'react'
import PollForm from './components/PollForm'
import PollList from './components/PollList'

// localStorage keys
const STORAGE_KEY_OPTIONS = 'votepulse_options'
const STORAGE_KEY_VOTED = 'votepulse_has_voted'

// Default poll options to seed the app on first load
const DEFAULT_OPTIONS = [
  { id: 1, label: 'React', votes: 0 },
  { id: 2, label: 'Vue', votes: 0 },
  { id: 3, label: 'Angular', votes: 0 },
  { id: 4, label: 'Svelte', votes: 0 },
]

function App() {
  // Load options from localStorage or fall back to defaults
  const [options, setOptions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OPTIONS)
      return saved ? JSON.parse(saved) : DEFAULT_OPTIONS
    } catch {
      return DEFAULT_OPTIONS
    }
  })

  // Track whether the user has already voted (persisted across refreshes)
  const [hasVoted, setHasVoted] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_VOTED) === 'true'
  })

  // Persist options whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OPTIONS, JSON.stringify(options))
  }, [options])

  // Persist hasVoted whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VOTED, String(hasVoted))
  }, [hasVoted])

  // Add a new poll option
  const handleAddOption = (label) => {
    const trimmed = label.trim()
    if (!trimmed) return

    // Prevent duplicates (case-insensitive)
    const exists = options.some(
      (o) => o.label.toLowerCase() === trimmed.toLowerCase()
    )
    if (exists) return false

    const newOption = {
      id: Date.now(),
      label: trimmed,
      votes: 0,
    }
    setOptions((prev) => [...prev, newOption])
    return true
  }

  // Cast a vote for a specific option
  const handleVote = (id) => {
    if (hasVoted) return
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, votes: o.votes + 1 } : o))
    )
    setHasVoted(true)
  }

  // Delete a specific option
  const handleDeleteOption = (id) => {
    setOptions((prev) => prev.filter((o) => o.id !== id))
  }

  // Reset all votes to zero and allow voting again
  const handleReset = () => {
    setOptions((prev) => prev.map((o) => ({ ...o, votes: 0 })))
    setHasVoted(false)
  }

  // Compute total votes for percentage calculations
  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0)

  return (
    <div className="min-h-screen" style={{ background: 'var(--soft-bg)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          background: 'var(--ink)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-800 text-lg"
              style={{ background: 'var(--gold)' }}
            >
              V
            </div>
            <div>
              <h1
                className="font-display font-bold text-xl leading-none"
                style={{ color: 'var(--cream)' }}
              >
                VotePulse
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Live Community Poll
              </p>
            </div>
          </div>

          {/* Stats pill */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--cream)' }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--teal)' }}
            />
            <span className="font-medium">{totalVotes}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>
              {totalVotes === 1 ? 'vote' : 'votes'}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero text */}
        <div className="mb-8 sm:mb-10">
          <h2
            className="font-display font-extrabold text-3xl sm:text-4xl leading-tight mb-2"
            style={{ color: 'var(--ink)' }}
          >
            What's your favourite
            <br />
            <span style={{ color: 'var(--coral)' }}>frontend framework?</span>
          </h2>
          <p style={{ color: '#6b6860' }} className="text-base sm:text-lg">
            Cast your vote below. One vote per session — make it count!
          </p>
        </div>

        {/* Voted banner */}
        {hasVoted && (
          <div
            className="mb-6 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium fade-in-up"
            style={{
              background: 'rgba(13, 148, 136, 0.1)',
              border: '1px solid rgba(13, 148, 136, 0.3)',
              color: 'var(--teal)',
            }}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your vote has been recorded. Thanks for participating!
          </div>
        )}

        {/* Poll list */}
        <PollList
          options={options}
          totalVotes={totalVotes}
          hasVoted={hasVoted}
          onVote={handleVote}
          onDelete={handleDeleteOption}
        />

        {/* Divider */}
        <div
          className="my-8 sm:my-10 border-t"
          style={{ borderColor: 'var(--border)' }}
        />

        {/* Add option form */}
        <div>
          <h3
            className="font-display font-bold text-lg mb-4"
            style={{ color: 'var(--ink)' }}
          >
            Add an option
          </h3>
          <PollForm onAddOption={handleAddOption} options={options} />
        </div>

        {/* Reset button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:opacity-80 active:scale-95"
            style={{
              background: 'transparent',
              border: '1.5px solid var(--border)',
              color: '#6b6860',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reset All Votes
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-16 py-6 border-t text-center text-sm"
        style={{ borderColor: 'var(--border)', color: '#9c9890' }}
      >
        Built with React + Vite + Tailwind CSS
      </footer>
    </div>
  )
}

export default App
