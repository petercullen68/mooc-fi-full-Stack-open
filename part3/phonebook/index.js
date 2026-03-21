require('dotenv').config()
const express = require('express')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorhandler')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(logger)
app.use(express.static('dist'))

// Converted
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  Person.findOne({ name: request.params.name })
    .then((person) => {
      if (person) {
        return response.status(409).json({
          error: 'name already exists',
        })
      } else {
        const person = new Person({
          name: name,
          number: number,
        })
        person
          .save()
          .then((savedPerson) => {
            response.json(savedPerson)
          })
          .catch((error) => next(error))
      }
    })

    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person
        .save()
        .then((updatedPerson) => {
          response.json(updatedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.get('/api/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.send(
        `<p>Phonebook has info for ${persons.length} people</p>\n<p>${new Date()}</p>`,
      )
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
