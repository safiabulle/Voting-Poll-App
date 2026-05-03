const PollOption = ({ option, onVote, onDelete, hasVoted, totalVotes }) => {
   const percentage = totalVotes === 0 
  ? 0 
  : Math.round((option.votes / totalVotes) * 100);

   return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
        <p className="text-slate-900 font-bold text-base sm:text-lg flex-1">
          {option.name}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onVote(option.id)}
            disabled={hasVoted}
            className="bg-blue-600 text-white px-3 sm:px-4 py-2 font-black uppercase tracking-wide border-2 border-blue-600 transform active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] text-xs sm:text-sm"
          >
            Vote
          </button>

          <button
            onClick={() => onDelete(option.id)}
            className="bg-yellow-600 text-slate-900 px-3 sm:px-4 py-2 font-black uppercase tracking-wide border-2 border-yellow-600 transform active:scale-95 transition-all duration-200 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] text-xs sm:text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm font-bold text-slate-600">{option.votes} votes</span>
        <span className="text-xs sm:text-sm font-bold text-slate-600">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 h-6 rounded-none border-2 border-slate-400 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
 
export default PollOption;
