import React from 'react';
import ReactDOM from 'react-dom';

const Part=({part}) => <p>{part.name} {part.exercises}</p>
const Header=({course}) => <h1>{course}</h1>
const Content=(props) => (
  <div>
    <Part part={props.part1}/>
    <Part part={props.part2}/>
    <Part part={props.part3}/>
  </div>
)
const Footer=({total}) => <p>Number of exercises {total}</p>
const App=() => {
  const course='Half Stack Application Development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return(
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Footer total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}
ReactDOM.render(<App />,document.getElementById('root'));

