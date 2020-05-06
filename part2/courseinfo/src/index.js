import React from 'react';
import ReactDOM from 'react-dom';
const Course=({course}) => (
  <div>
    <Header course={course.name}/>
    <Content part={course.parts}/>
  </div>
)
const Part=({part}) => <p>{part.name} {part.exercises}</p>
const Header=({course}) => <h1>{course}</h1>
const Content=(props) => (
  <div>
    {props.part.map(part => <Part key={part.id} part={part}/>)}
  </div>
)
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
ReactDOM.render(<App />,document.getElementById('root'));

