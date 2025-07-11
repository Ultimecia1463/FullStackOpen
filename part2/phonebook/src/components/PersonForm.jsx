import React from 'react'

const PersonForm = ({persons,setPersons}) => {
  return (
    <form onSubmit={
        (e) => {
            e.preventDefault()
            persons.some(person=> person.name===e.target.name.value)
            ? alert(e.target.name.value + " is already added to phonebook")
            : setPersons(persons.concat({name:e.target.name.value, number:e.target.number.value, id:persons.length+1}))
        }
    } >
        <div>
            Name: <input name="name" />
        </div>
        <div>
            Number: <input name="number" />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm