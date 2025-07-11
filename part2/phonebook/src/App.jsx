import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '915-544-4446'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person=> person.name===newName)
    ? alert(newName + " is already added to phonebook")
    : (setPersons(persons.concat({name:newName, number:newNumber})), setNewName(''), setNewNumber(''))
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person=> <li key={person.name} >{person.name} {person.number} </li> )}
      </ul>
    </div>
  )
}

export default App