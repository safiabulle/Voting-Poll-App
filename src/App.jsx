import { useState, useEffect } from 'react'
import PollList from "./components/PollList";
import PollForm from "./components/PollForm";

function App() {
  const [options, setOptions] = useState(() => {
  const savedOptions = localStorage.getItem("pollOptions");

  return savedOptions
    ? JSON.parse(savedOptions)
    : [
    {id:1, name: "React", votes: 0 },
    {id:2, name: "Vue", votes: 0 },
    {id:3, name: "Angular", votes: 0 },
    ];
    
});
// state that remembers user has already voted... when user clicks vote set the false to true then disable all the vote button
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (id) => {
  setOptions(prevOptions =>
    prevOptions.map(option =>
      option.id === id
      ?{...option,votes: option.votes + 1}
      : option
    )

  );
  setHasVoted(true);
};

const handleReset = () => {
  setOptions(prevOptions =>
    prevOptions.map(option => ({
      ...option,
      votes: 0
    }))
  );

  setHasVoted(false);
};

const handleAddOption = (name) => {
  setOptions(prevOptions => [
    ...prevOptions,
    {
      id: Date.now(),
      name: name,
      votes: 0
    }
  ]);
};

useEffect(() => {
  localStorage.setItem("pollOptions", JSON.stringify(options));
}, [options]);

const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div>
      <h1>Voting Poll App</h1>
      
    <PollForm onAddOption={handleAddOption} />

      <PollList options={options} 
      onVote={handleVote}
      hasVoted={hasVoted}
      totalVotes={totalVotes}
      />
      <button onClick={handleReset}>
      Reset Votes
      </button>
    </div>
  );
}


export default App;
