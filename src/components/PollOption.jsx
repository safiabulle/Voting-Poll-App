import { useState } from 'react'

function PollOption({ option, totalVotes, hasVoted, isSignedIn, isLeader, rank, onVote, onDelete }) {
  const [justVoted, setJustVoted] = useState(false)

  const percentage =
    totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

  const handleVoteClick = () => {
    if (hasVoted) return
    if (!isSignedIn) {
      onVote(option.id)
      return
    }

    setJustVoted(true)
    onVote(option.id)
    setTimeout(() => setJustVoted(false), 400)
  }

  return (
    <div
      className={`fade-in-up rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
        isLeader ? 'shadow-md' : ''
      }`}
      style={{
        background: isLeader
          ? 'linear-gradient(135deg, #fff9f0 0%, #ffffff 100%)'
          : 'var(--card-bg)',
        border: isLeader
          ? '1.5px solid rgba(232, 166, 40, 0.4)'
          : '1.5px solid var(--border)',
        animationDelay: `${(rank - 1) * 60}ms`,
      }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold shrink-0"
          style={{
            background: isLeader ? 'var(--gold)' : '#f0ede6',
            color: isLeader ? '#fff' : '#9c9890',
          }}
        >
          {rank}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span
              className="font-display font-semibold text-base sm:text-lg truncate"
              style={{ color: 'var(--ink)' }}
            >
              {option.label}
              {isLeader && option.votes > 0 && (
                <span
                  className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: 'rgba(232, 166, 40, 0.15)',
                    color: 'var(--gold)',
                  }}
                >
                  Leading
                </span>
              )}
            </span>

            <div className="text-right shrink-0">
              <span
                className="font-display font-bold text-base sm:text-lg"
                style={{ color: isLeader ? 'var(--coral)' : 'var(--ink)' }}
              >
                {percentage}%
              </span>
              <p className="text-xs" style={{ color: '#9c9890' }}>
                {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
              </p>
            </div>
          </div>

          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: '8px', background: '#f0ede6' }}
          >
            <div
              className="progress-bar h-full rounded-full"
              style={{
                width: `${percentage}%`,
                background: isLeader
                  ? 'linear-gradient(90deg, var(--coral), var(--gold))'
                  : 'var(--teal)',
              }}
            />
          </div>
        </div>

        <button
          onClick={handleVoteClick}
          disabled={hasVoted}
          className={`
            shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
            ${justVoted ? 'vote-pulse' : ''}
            ${
              hasVoted
                ? 'cursor-not-allowed opacity-40'
                : 'cursor-pointer hover:opacity-90 active:scale-95 hover:shadow-md'
            }
          `}
          style={{
            background: hasVoted || !isSignedIn ? '#e0ddd6' : 'var(--teal)',
            color: hasVoted || !isSignedIn ? '#9c9890' : '#ffffff',
          }}
          title={
            hasVoted
              ? 'You have already voted'
              : isSignedIn
                ? `Vote for ${option.label}`
                : 'Sign in before voting'
          }
        >
          {hasVoted ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            isSignedIn ? 'Vote' : 'Sign in'
          )}
        </button>
        
        {onDelete && (
          <button
            onClick={() => onDelete(option.id)}
            className="ml-2 shrink-0 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:opacity-80 active:scale-95"
            style={{
              background: 'transparent',
              border: '1.5px solid var(--border)',
              color: '#6b6860',
            }}
            title={`Delete ${option.label}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default PollOption
