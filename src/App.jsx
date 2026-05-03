import { useState, useEffect } from 'react'
import PollList from "./components/PollList";
import PollForm from "./components/PollForm";

const defaultOptions = [
  { id: 1, name: "Manchester United", votes: 0 },
  { id: 2, name: "Liverpool", votes: 0 },
  { id: 3, name: "3-2", votes: 0 },
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

  // Calculate votes for percentage display.
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-200 flex flex-col items-center pt-6 px-4 pb-12">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-wider text-blue-600 mb-8 md:mb-12 italic" style={{ textShadow: '6px 6px 0px rgba(0,0,0,0.8), -2px -2px 0px rgba(37, 99, 235, 0.2)', transform: 'skewX(-5deg)' }}>POLL LAB</h1>
      
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white text-slate-900 p-4 sm:p-6 md:p-10 rounded-none border-4 border-yellow-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.6)]">
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
          className="w-full mt-6 bg-blue-600 text-white px-4 py-3 font-black uppercase tracking-wide border-2 border-blue-600 transform active:scale-95 transition-all duration-200 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] text-sm sm:text-base md:text-lg"
        >
          Reset Poll
        </button>
      </div>
    </div>
  );
}


export default App;
