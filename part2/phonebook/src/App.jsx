import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/person'
import PersonForm from './components/PersonForm'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStart, setFilterStart] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
    const enteredPerson = {
      name: newName.trim(),
      number: newNumber,
    }
    const normalizedName = newName.trim().toUpperCase()
    const foundPerson = persons.find(person => person.name.trim().toUpperCase() === normalizedName) 
    if (foundPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        enteredPerson.id = foundPerson.id
        personService
          .updatePerson(enteredPerson.id, enteredPerson)
          .then((changedPerson) => {
            const updatedPersons = persons.map(person => {
              if (person.id === changedPerson.id) {
                return changedPerson; 
              }
              return person; 
            });
            setPersons(updatedPersons)
          })
      }
    } else {
      enteredPerson.id = max.id + 1
      setPersons(persons.concat(enteredPerson))
    }
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = person => {
    console.log(person.id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          const newPersons  = persons.filter(x => x.id !== person.id)
          setPersons(newPersons)
        })
    }
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
      <Persons filteredArray={filteredArray} deleteHandler={deletePerson} />
    </div>
  )
}

export default App
