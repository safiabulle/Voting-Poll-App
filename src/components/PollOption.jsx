const PollOption = ({ option, onVote, onDelete, hasVoted, totalVotes }) => {
   const percentage = totalVotes === 0 
  ? 0 
  : Math.round((option.votes / totalVotes) * 100);

   return (
    <div className="mb-4">
    <div className="flex justify-between items-center">
      <p>
        {option.name} - {option.votes} votes ({percentage}%)
      </p>


    <button
          onClick={() => onVote(option.id)}
          disabled={hasVoted}
          className="rounded-lg bg-blue-500 px-3 py-1 text-white shadow-sm transition-colors duration-200 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400 disabled:shadow-none disabled:hover:bg-gray-400"
        >
          Vote
        </button>

        <button
      onClick={() => onDelete(option.id)}
      className="rounded-lg bg-red-500 px-3 py-1 text-white shadow-sm transition-colors duration-200 hover:bg-red-600 active:bg-red-700"
       >
       Delete
      </button>
      </div>

 <div className="w-full h-5 mt-3 overflow-hidden rounded-full bg-slate-200 shadow-inner ring-1 ring-slate-300">
        <div
          className="poll-bar-fill h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

    </div>
  );
};
 
export default PollOption;
