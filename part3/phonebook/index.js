require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const Person = require("./models/Person")

const app = express()
app.use(cors())

app.use(express.json())

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

app.use(express.static('dist'))

app.get('/info', async (request, response) => {
  const count = await Person.estimatedDocumentCount({})
  response.send(`<p>Phonebook has info for ${count} people</p>` +
               `<p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', async (request, response) => {
  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'malformatted id' })
  }

  const person = await Person.findById(id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', async (request, response) => {
  if (! await Person.findById(request.params.id)) {
    return response.status(400).json({
      error: "The person not exists in the phonebook",
    });
  }
  await Person.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

app.post('/api/persons', async (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  }

  if(await Person.findOne({ name: name })) {
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    })
  }

  const person = {
    name,
    number,
  }
  const newPerson = await new Person(person)
  await newPerson.save()
  response.json(newPerson)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})