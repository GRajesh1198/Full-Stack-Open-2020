import React,{useState} from 'react'
import Filter from './Components/Filter'
import Form from './Components/Form'
import Persons from './Components/Persons'
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'0401234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ]=useState('')
  const [ search, setSearch ]=useState('')

  const handleNameChange=(event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange=(event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch=(event) => {
    setSearch(event.target.value)
  }
  const handleSubmit=(event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)){
      return window.alert(`${newName} already added to phonebook`)
    }
    const newPerson={name:newName, number:newNumber}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }
  var personsToShow=search.length ===0 ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch}/>
      <br/>
      <Form handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App