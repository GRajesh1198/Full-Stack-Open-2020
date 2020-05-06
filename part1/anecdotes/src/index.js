import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote=({title,content,votes}) => <div><h1>{title}</h1>{content}<br/>has {votes} votes</div>
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState(Array(anecdotes.length).fill(0))
  const generateRandomNumber=()=>Math.round(Math.random() * (anecdotes.length-1))
  const mostVotes=votes.reduce((requiredIndex,currentValue,index,votes) => (votes[requiredIndex] < currentValue ? index:requiredIndex),0)
  const eventHandler=() => {
    let randomNumber=generateRandomNumber()
    while(selected === randomNumber){
      randomNumber=generateRandomNumber()
    }
    setSelected(randomNumber)
  }
  const voteHandler=() => {
    const votesCopy=[...votes]
    votesCopy[selected]+=1
    setVotes(votesCopy)
  }
  return (
    <div>
      <Anecdote title="Anecdote of the day" content={props.anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={voteHandler}>vote</button>
      <button onClick={eventHandler}>next anecdote</button>
      <Anecdote title="Anecdote with most votes" content={props.anecdotes[mostVotes]} votes={votes[mostVotes]}/>
      {/* <button onClick={previousHandler}>previous anecdote</button> */}
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