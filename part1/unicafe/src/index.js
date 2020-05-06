import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics=({good,bad,neutral,total}) => {
  return(
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good - bad)/total}</p>
      <p>positive {(good/total)*100}%</p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal]=useState(0)

  const goodHandler=()=>{setTotal(total+1);setGood(good + 1)}
  const neutralHandler=()=>{setTotal(total+1);setNeutral(neutral + 1)}
  const badHandler=()=>{setTotal(total+1);setBad(bad + 1)}

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodHandler}>good</button>
      <button onClick={neutralHandler}>neutral</button>
      <button onClick={badHandler}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)