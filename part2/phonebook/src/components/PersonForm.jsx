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

            const somePerson = persons.filter(person=> person.name===newPerson.name)

            if (somePerson.length!==0){
                if (confirm(newPerson.name+" is already added to phonebook, replace the old number with a new one?")) {
                    somePerson[0]={...somePerson[0],number:newPerson.number}
                    services.update(somePerson[0].id,somePerson[0])
                    setPersons(persons.map(person=>person.id!==somePerson[0].id?person:somePerson[0]))
                }
            }else {
                setPersons(persons.concat(newPerson)),
                services.create(newPerson)
            }
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