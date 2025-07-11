import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filtered, setFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person=> person.name===newName)
    ? alert(newName + " is already added to phonebook")
    : (setPersons(persons.concat({name:newName, number:newNumber, id:persons.length+1})), setNewName(''), setNewNumber(''))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter numbers with <input onChange={event => setFiltered(
          persons.filter(
            person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
          )
        )}/>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson} >
        <div>
          Name: <input value={newName} onChange={(event)=>setNewName(event.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filtered.map(person=> <li key={person.name} >{person.name} {person.number} </li> )}
      </ul>
    </div>
  )
}

export default App