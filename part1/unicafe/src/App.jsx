import { useState } from 'react'

const Statistics = ({good,neutral,bad,feedback}) => {
  const total = good+neutral+bad
  if(!feedback){ return <p>No feedback given</p>}
  return (
    <>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {total} </p>
      <p>average {total/3} </p>
      <p>positive {good/total*100} % </p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback,setFeedback] = useState(false) 

  return (
    <>
      <h1>give feedback</h1>

      <button onClick={()=>{
        setGood(good+1)
        setFeedback(true)
      }} >good</button>

      <button onClick={()=>{
        setNeutral(neutral+1)
        setFeedback(true)
      }} >neutral</button>

      <button onClick={()=>{
        setBad(bad+1)
        setFeedback(true)
      }} >bad</button>

      <h1>statistics</h1>
      
      <Statistics good={good} neutral={neutral} bad={bad} feedback={feedback} />
    </>
  )
}

export default App