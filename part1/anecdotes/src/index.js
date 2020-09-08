import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}
const Anecdote = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
      <p>{props.anecdote}<br />has {props.score} votes</p>
    </>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)

  const randomIndex = (max) => Math.floor(Math.random() * Math.floor(max))
  const numberOfAnecdotes = props.anecdotes.length
  const [scores, setScores] = useState(new Array(numberOfAnecdotes).fill(0))
  const maxIndex = scores.indexOf(Math.max(...scores))

  return (
    <div>
      <Anecdote header="Anecdote of the day" anecdote={props.anecdotes[selected]} score={scores[selected]} />
      <Button text='vote'
        clickHandler={() => {
          const scoresCopy = [...scores]
          scoresCopy[selected] += 1
          setScores(scoresCopy)
        }} />
      <Button text='next anecdote'
        clickHandler={() => setSelected(randomIndex(numberOfAnecdotes))} />
      <Anecdote header="Anecdote with most votes" anecdote={props.anecdotes[maxIndex]} score={scores[maxIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)