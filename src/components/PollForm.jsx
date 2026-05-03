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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter poll option"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />

      <button
        type="submit"
        className="rounded-lg bg-green-500 px-3 py-1 text-white shadow-sm transition-colors duration-200 hover:bg-green-600 active:bg-green-700"
      >
        Add
      </button>
    </form>
  );
};

export default PollForm;
