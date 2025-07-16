import React from 'react'
import services from '../services/persons'

const PersonForm = ({persons,setPersons}) => {
  return (
    <form onSubmit={
        (e) => {
            e.preventDefault()
            const newPerson = {
                name:e.target.name.value,
                number:e.target.number.value,
                id:String(persons.length+1)
            }

            persons.some(person=> person.name===newPerson.name)
            ? alert(newPerson.name + " is already added to phonebook")
            : (
                setPersons(persons.concat(newPerson)),
                services.create(newPerson)
            )
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