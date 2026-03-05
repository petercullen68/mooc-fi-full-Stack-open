import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ count, text, unit }) => {
  return <>
    <td>{text}</td>
    <td>{count}</td>
    <td>{unit}</td>
  </>
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral



  let average = 0
  let positiveFeedback = 0
  if (total > 0) {
    average = ((good - bad) / total).toFixed(1)
    positiveFeedback = ((good / total) * 100).toFixed(1)
    return (
      <table>
        <tbody>
          <tr><StatisticLine text='good' count={good} /></tr>
          <tr><StatisticLine text='neutral' count={neutral} /></tr>
          <tr><StatisticLine text='bad' count={bad} /></tr>
          <tr><StatisticLine text='all' count={total} /></tr>
          <tr><StatisticLine text='average' count={average} /></tr>
          <tr><StatisticLine text='positive' count={positiveFeedback} unit='%' /></tr>
        </tbody>
      </table>)
  }
  return (
    <>no feedback given</>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    const updatedCount = good + 1
    setGood(updatedCount)
  }

  const incrementNeutral = () => {
    const updatedCount = neutral + 1
    setNeutral(updatedCount)
  }

  const incrementBad = () => {
    const updatedCount = bad + 1
    setBad(updatedCount)
  }

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={() => incrementGood()} text="good" />
      <Button onClick={() => incrementNeutral()} text="neutral" />
      <Button onClick={() => incrementBad()} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </>
  )
}

export default App