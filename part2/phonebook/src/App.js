import React,{useState} from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const handleInputChange=(event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleSubmit=(event) => {
    event.preventDefault()
    const newPerson={name:newName}
    setPersons(persons.concat(newPerson))
    setNewName('')
  }
  return (
    <div>
      <div>debug :{newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =><div>{person.name}</div>)}
    </div>
  )
}

export default App