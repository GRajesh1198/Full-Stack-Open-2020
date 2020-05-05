import React from 'react';
import ReactDOM from 'react-dom';

const Part=({part}) => <p>{part.name} {part.exercises}</p>
const Header=({course}) => <h1>{course}</h1>
const Content=(props) => (
  <div>
    <Part part={props.part[0]}/>
    <Part part={props.part[1]}/>
    <Part part={props.part[2]}/>
  </div>
)
const Footer=({parts}) => <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
const App=() => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return(
    <div>
      <Header course={course.name}/>
      <Content part={course.parts}/>
      <Footer parts={course.parts}/>
    </div>
  )
}
ReactDOM.render(<App />,document.getElementById('root'));

