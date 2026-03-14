import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './App.css'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStart, setFilterStart] = useState('')

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
    console.log(event.target.value)
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
