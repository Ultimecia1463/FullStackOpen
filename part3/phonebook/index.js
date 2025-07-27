require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const Person = require("./models/Person")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body',
  {
    skip: (req) => req.method !== 'POST'
  }
))
app.use(
  morgan('tiny', 
  {
    skip: (req) => req.method === 'POST'
  }
))

app.get('/info', (req, res, next) => {
  Person.estimatedDocumentCount({})
    .then(count => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    })
    .catch(next)
})


app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) {
        return res.status(400).json({ error: 'The person does not exist in the phonebook' })
      }
      res.status(204).end()
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'The name or number is missing' })
  }

  Person.findOne({ name })
    .then(existing => {
      if (existing) {
        return res.status(400).json({ error: 'The name already exists in the phonebook' })
      }

      const newPerson = new Person({ name, number })
      return newPerson.save()
    })
    .then(saved => res.json(saved))
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body
  const id = req.params.id

  if (!number) {
    return res.status(400).json({ error: 'number is missing' })
  }

  const update = { number }

  Person.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(next)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint)

app.use((err, req, res, next) => {
  console.error(err.name, err.message)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})