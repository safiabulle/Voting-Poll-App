const PollOption = ({ option, onVote, hasVoted, totalVotes }) => {
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
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
        >
          Vote
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
