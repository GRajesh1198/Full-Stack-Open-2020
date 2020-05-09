import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Form from './Components/Form'
import Persons from './Components/Persons'
const App = () => {
  const [ persons, setPersons ] = useState([])
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])
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