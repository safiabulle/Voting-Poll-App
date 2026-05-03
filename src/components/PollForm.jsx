import { useState } from "react";

const PollForm = ({ onAddOption }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    onAddOption(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row mb-6">
      <input
        type="text"
        placeholder="Enter poll option"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border-2 border-yellow-600 px-4 py-2 bg-white text-slate-900 font-bold placeholder-slate-500 w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 sm:px-6 py-2 font-black uppercase tracking-wide border-2 border-blue-600 transform active:scale-95 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm sm:text-base"
      >
        Add
      </button>
    </form>
  );
};

export default PollForm;
