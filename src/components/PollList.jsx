import PollOption from "./PollOption";

const PollList = ({ options, onVote, onDelete, hasVoted, totalVotes  }) => {

  return (
    <div>
      {options.map((option) => (
        <PollOption
          key={option.id}
          option={option}
          onVote={onVote}
          onDelete={onDelete}
          hasVoted={hasVoted}
           totalVotes={totalVotes}
        />
      ))}
    </div>
  );
};

export default PollList;
