import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(() => Array(10).fill(0))
  const [selected, setSelected] = useState(0)
  const [topIndex, setTopIndex] = useState(0);
  const [topVotes, setTopVotes] = useState(0);


  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} <br />has {votes[selected]} votes</p>

      <button onClick={ () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);

        if (copy[selected] > topVotes) {
          setTopVotes(copy[selected]);
          setTopIndex(selected);
        }
      } } >vote</button>
  
      <button onClick={ ()=> setSelected(Math.floor(Math.random() * anecdotes.length)) } >next anecdote</button>

      <h1>Anecdote with most Votes</h1>
      <p>{anecdotes[topIndex]} <br />has {topVotes} votes</p>
    </>
  )
}

export default App