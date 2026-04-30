import { useState } from 'react'
import PollList from "./components/PollList";

function App() {
  const [options, setOptions] = useState([
    {id:1, name: "React", votes: 0 },
    {id:2, name: "Vue", votes: 0 },
    {id:3, name: "Angular", votes: 0 },
    
  ]);

  const [hasVoted, setHasVoted] = useState(false);

  return (
    <div>
      <h1>Voting Poll App</h1>

      <PollList options={options}/>
    </div>
  );
}

export default App;
