import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './App.css'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStart, setFilterStart] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const filteredArray = persons.filter(x => x.name.trim()
    .toLocaleUpperCase()
    .startsWith(
      filterStart.trim()
        .toLocaleUpperCase()))


  const addPerson = (event) => {
    const max = persons.reduce(function (prev, current) {
      return (prev && prev.id > current.id) ? prev : current
    })
    event.preventDefault()
    if (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: max.id + 1
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName("")
    setNewNumber("")
  }

  const handleFilterChange = (event) => {
    setFilterStart(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filterStart={filterStart} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredArray={filteredArray} />
    </div>
  )
}

export default App
