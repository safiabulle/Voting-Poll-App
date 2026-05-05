import PollOption from "./PollOption";



const PollList = ({ options, onVote, hasVoted, totalVotes  }) => {

  if (options.length === 0) {
  return (
    <p className="text-gray-500 text-center mt-4">
      No poll options available.
    </p>
  );
}

  return (
    <div>
      {options.map((option) => (
        <PollOption
          key={option.id}
          option={option}
          onVote={onVote}
          hasVoted={hasVoted}
           totalVotes={totalVotes}
        />
      ))}
    </div>
  );
};

export default PollList;