import React from 'react';
import Course from './Components/Course'
const App=({courses})=>(
    <div>
        <h1>Web Development Curriculum</h1>
        {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
)

export default App
