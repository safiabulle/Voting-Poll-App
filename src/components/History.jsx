function History({ history, onBack }) {
  return (
    <div className="rounded-2xl p-4 duration-300 bg-white shadow-sm border border-yellow-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] font-semibold" style={{ color: '#6b6860' }}>
            History
          </p>
          <h2 className="font-display font-bold text-2xl mt-2" style={{ color: 'var(--ink)' }}>
            Previous Poll Winners
          </h2>
        </div>

        <button
          onClick={onBack}
          className="rounded-2xl p-4 duration-300 bg-green-600 text-white font-semibold transition-all hover:opacity-90 active:scale-95"
        >
          Back to Voting
        </button>
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl p-4 duration-300 border border-dashed" style={{ borderColor: 'var(--border)', color: '#6b6860' }}>
          <p className="font-medium">No completed polls yet.</p>
          <p className="text-sm mt-2">Finish a poll to add results here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item, index) => (
            <article
              key={`${item.timestamp}-${index}`}
              className="rounded-2xl p-4 duration-300 shadow-md"
              style={{
                background: 'linear-gradient(135deg, #fff9f0 0%, #ffffff 100%)',
                border: '1.5px solid rgba(232, 166, 40, 0.4)',
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: 'rgba(0, 0, 0, 0.06)' }}>
                  <span className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>
                    Winner #{index + 1}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: '#6b6860' }}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--ink)' }}>
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: '#4a4740' }}>
                Top vote-getter:
                <span className="font-semibold text-black"> {item.winnerName}</span>
              </p>

              <p className="mt-3 text-xs uppercase tracking-[0.18em]" style={{ color: '#9c9890' }}>
                Finished at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default History
