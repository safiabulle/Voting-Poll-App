import PollOption from './PollOption'

function PollList({ options, totalVotes, hasVoted, isSignedIn, isLoading, onVote, onDelete }) {
  if (isLoading) {
    return (
      <div
        className="text-center py-16 rounded-2xl border-2 border-dashed"
        style={{ borderColor: 'var(--border)', color: '#9c9890' }}
      >
        <p className="font-medium">Loading live results...</p>
      </div>
    )
  }

  if (options.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-2xl border-2 border-dashed"
        style={{ borderColor: 'var(--border)', color: '#9c9890' }}
      >
        <svg
          className="w-12 h-12 mx-auto mb-3 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="font-medium">No poll options yet.</p>
        <p className="text-sm mt-1">Add the first option below!</p>
      </div>
    )
  }

  const sorted = [...options].sort((a, b) => b.votes - a.votes)
  const leaderId = sorted[0]?.votes > 0 ? sorted[0].id : null

  return (
    <div className="space-y-3">
      {sorted.map((option, index) => (
        <PollOption
          key={option.id}
          option={option}
          totalVotes={totalVotes}
          hasVoted={hasVoted}
          isSignedIn={isSignedIn}
          isLeader={option.id === leaderId}
          rank={index + 1}
          onVote={onVote}
          onDelete={onDelete} 
        />
      ))}
    </div>
  )
}

export default PollList
