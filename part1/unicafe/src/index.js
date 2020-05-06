import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics=({good,bad,neutral,total}) => {
  if(total!==0){
    return(
      <table>
        <tbody>
        <tr><Statistic text="good" value={good}/></tr>       
        <tr><Statistic text="neutral" value={neutral}/></tr>
        <tr><Statistic text="bad" value={bad}/></tr>
        <tr><Statistic text="total" value={total}/></tr>
        <tr><Statistic text="average" value={((good - bad)/total).toFixed(1)}/></tr>
        <tr><Statistic text="positive" value={((good/total)*100).toFixed(1) + "%"}/></tr>
        </tbody>
      </table>
    )
  }else{
    return(<p>No feedback given</p>)
  }
  
}
const Button=({clickHandler,text}) => <button onClick={clickHandler}>{text}</button>
const Statistic=({value,text}) => (
  <>
  <td>{text}</td>
  <td>{value}</td>
  </>
)
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
      <Button clickHandler={goodHandler} text="good"/>
      <Button clickHandler={neutralHandler} text="neutral"/>
      <Button clickHandler={badHandler} text="bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)