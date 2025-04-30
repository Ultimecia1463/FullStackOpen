import { useState } from 'react'

const Statistics = ({good,neutral,bad,feedback}) => {
  const total = good+neutral+bad
  if(!feedback){ return <p>No feedback given</p>}
  return (
    <>
      <StatisticLine text="good" stat={good} />
      <StatisticLine text="neutral" stat={neutral} />
      <StatisticLine text="bad" stat={bad} />
      <StatisticLine text="all" stat={total} />
      <StatisticLine text="average" stat={total/3} />
      <StatisticLine text="positive" stat={good/total*100} />g
    </>
  )
}

const Button = ({onClick,text})=> <button onClick={onClick} >{text}</button>

const StatisticLine = ({text,stat}) => <p>{text} {stat}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback,setFeedback] = useState(false) 

  return (
    <>
      <h1>give feedback</h1>

      <Button onClick={ ()=> {
        setGood(good+1)
        setFeedback(true)
      } } text="good" />

      <Button onClick={ ()=> {
        setNeutral(neutral+1)
        setFeedback(true)
      } } text="neutral" />

      <Button onClick={ ()=> {
        setBad(bad+1)
        setFeedback(true)
      } } text="bad" />

      <h1>statistics</h1>
      
      <Statistics good={good} neutral={neutral} bad={bad} feedback={feedback} />
    </>
  )
}

export default App