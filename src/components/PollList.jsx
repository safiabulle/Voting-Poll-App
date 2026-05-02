import PollOption from "./PollOption";

const PollList = ({ options, onVote, hasVoted, totalVotes  }) => {

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
