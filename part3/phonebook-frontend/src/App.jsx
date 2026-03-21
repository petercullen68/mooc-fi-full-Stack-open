import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/person'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStart, setFilterStart] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const displayNotification = ( message, type) => {
    const newNotification = {
      message: message,
      type: type
    }
    setNotification(newNotification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const filteredArray = persons.filter(x => x.name.trim()
    .toLocaleUpperCase()
    .startsWith(
      filterStart.trim()
        .toLocaleUpperCase()))


  const addPerson = (event) => {
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
          .then(changedPerson => {
            const updatedPersons = persons.map(person => {
              if (person.id === changedPerson.id) {
                return changedPerson; 
              }
              return person; 
            });
            setPersons(updatedPersons)
          })
          .catch(error => {
            displayNotification(`${error.response.data.error}`, "error")
          })
      }
    } else {
      personService
        .addPerson(enteredPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          displayNotification(`Added ${enteredPerson.name}`, "success")
        })
        .catch(error => {
          displayNotification(`${error.response.data.error}`, "error")
        })
      
    }
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .catch(() => {
          displayNotification(`Information of ${person.name} has already been removed from the server`, "error")
        })
        .finally(() => {
          const newPersons = persons.filter(x => x.id !== person.id)
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
      <Notification notification={notification} />
      <Filter handleFilterChange={handleFilterChange} filterStart={filterStart} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredArray={filteredArray} deleteHandler={deletePerson} />
    </div>
  )
}

export default App
