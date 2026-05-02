const PollOption = ({ option, onVote, hasVoted, totalVotes }) => {
   const percentage = totalVotes === 0 
  ? 0 
  : Math.round((option.votes / totalVotes) * 100);

  return (
    <div className="flex items-center gap-3">
      <p>
        {option.name} - {option.votes} votes ({percentage}%)
      </p>

      <div style={{ background: "#eee", width: "100%", height: "10px" }}>
  <div 
    style={{
      width: `${percentage}%`,
      height: "100%",
      background: "blue"
    }}
  ></div>
</div>

      <button 
        onClick={() => onVote(option.id)} 
        disabled={hasVoted}
        className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
      >
        Vote
      </button>
    </div>
  );
};

export default PollOption;