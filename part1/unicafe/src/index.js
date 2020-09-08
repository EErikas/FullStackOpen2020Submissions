import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}
const Button = (props) => {
  //Click handler, does the following actions:
  const clickHandler = () => {
    props.feedbackHandler(props.feedback + 1) // ... increments feedback value (good/bad/neutral)
    props.allHandler(props.all + 1) // ... increments all clicks
    props.scoreHandler(props.score + props.value) // ... adds defined score

  }
  return (
    <button onClick={clickHandler}>{props.text}</button>
  )
}
const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.stat} {props.mark}</td>
    </tr>

  )
}
const Statistics = (props) => {
  if (props.stats[3] > 0) {
    return (
      <table>
        <tbody>
          <Statistic name='good' stat={props.stats[0]} />
          <Statistic name='neutral' stat={props.stats[1]} />
          <Statistic name='bad' stat={props.stats[2]} />
          <Statistic name='all' stat={props.stats[3]} />
          <Statistic name='average' stat={props.stats[4]} />
          <Statistic name='positive' stat={props.stats[5]} mark="%" />
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // Define new states for all clicks and scores
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)
  //Create stats array to hold all statistics
  const stats = [
    good, neutral, bad,
    all, score / all, good / all * 100
  ]
  return (

    <div>
      <Header header='give feedback' />
      <Button feedbackHandler={setGood} feedback={good} text='good' value={1}
        all={all} allHandler={setAll} score={score} scoreHandler={setScore} />
      <Button feedbackHandler={setNeutral} feedback={neutral} text='neutral' value={0}
        all={all} allHandler={setAll} score={score} scoreHandler={setScore} />
      <Button feedbackHandler={setBad} feedback={bad} text='bad' value={-1}
        all={all} allHandler={setAll} score={score} scoreHandler={setScore} />

      <Header header='statistics' />
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
