import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  const total = good+neutral+bad
  if(total===0){ return <p>No feedback given</p>}
  return (
    <table>
      <tbody>
        <StatisticLine text="good" stat={good} />
        <StatisticLine text="neutral" stat={neutral} />
        <StatisticLine text="bad" stat={bad} />
        <StatisticLine text="all" stat={total} />
        <StatisticLine text="average" stat={total/3} />
        <StatisticLine text="positive" stat={good/total*100} />
      </tbody>
    </table>
  )
}

const Button = ({onClick,text})=> <button onClick={onClick} >{text}</button>

const StatisticLine = ({text,stat}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {stat} </td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>

      <Button onClick={ ()=> {setGood(good+1)} } text="good" />
      <Button onClick={ ()=> {setNeutral(neutral+1)} } text="neutral" />
      <Button onClick={ ()=> {setBad(bad+1)} } text="bad" />

      <h1>statistics</h1>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App