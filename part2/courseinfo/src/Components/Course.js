import React from 'react'

const Course=({course}) => (
    <div>
      <Header course={course.name}/>
      <Content part={course.parts}/>
      <Footer part={course.parts}/>
    </div>
  )
  const Part=({part}) => <p>{part.name} {part.exercises}</p>
  const Header=({course}) => <h1>{course}</h1>
  const Content=(props) => (
    <div>
      {props.part.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
  const Footer=({part}) => <strong>total of {part.reduce((total,item)=>total+=item.exercises,0)} exercises</strong>
  //part.reduce will iterate over parts and extract the no of exercises by item.exercises and add to total

  export default Course