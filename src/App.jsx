import { useState, useEffect } from 'react'
import PollList from "./components/PollList";
import PollForm from "./components/PollForm";

const defaultOptions = [
  { id: 1, name: "React", votes: 0 },
  { id: 2, name: "Vue", votes: 0 },
  { id: 3, name: "Angular", votes: 0 },
];

function App() {
  // Poll options (loaded from localStorage if available)
  const [options, setOptions] = useState(() => {
    const savedOptions = localStorage.getItem("pollOptions");

    return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
  });

  // Remember whether the user has voted so the vote buttons stay disabled after refresh.
  const [hasVoted, setHasVoted] = useState(() => {
    return localStorage.getItem("hasVoted") === "true";
  });

  const handleVote = (id) => {
    setOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id
          ? { ...option, votes: option.votes + 1 }
          : option
      )

    );
    setHasVoted(true);
  };

  // Restore the original poll options and allow the user to vote again.
  const handleReset = () => {
    setOptions(defaultOptions);
    setHasVoted(false);
  };

  // Delete a poll option.
  const handleDeleteOption = (id) => {
    setOptions(prevOptions =>
      prevOptions.filter(option => option.id !== id)
    );
  };


  // Add a new poll option from user input.
  const handleAddOption = (name) => {
    setOptions(prevOptions => [
      ...prevOptions,
      {
        id: Date.now(),
        name: name.trim(),
        votes: 0
      }
    ]);
  };

  // Save options and voting status to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem("pollOptions", JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    localStorage.setItem("hasVoted", String(hasVoted));
  }, [hasVoted]);

  // Calculate total votes for percentage display.
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Voting Poll App</h1>

      <PollForm onAddOption={handleAddOption} />

      <PollList
        options={options}
        onVote={handleVote}
        onDelete={handleDeleteOption}
        hasVoted={hasVoted}
        totalVotes={totalVotes}
      />
      <button
        onClick={handleReset}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset Poll
      </button>

    </div>
  );
}


export default App;
