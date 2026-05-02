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

 <div className="w-full bg-gray-200 h-2 mt-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

    </div>
  );
};
 
export default PollOption;