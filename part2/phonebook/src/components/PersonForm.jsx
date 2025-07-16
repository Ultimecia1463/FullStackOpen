import React from 'react'
import services from '../services/persons'

const PersonForm = ({persons,setPersons,setNotification}) => {
  return (
    <form onSubmit={
        (e) => {
            e.preventDefault()
            const newPerson = {
                name:e.target.name.value,
                number:e.target.number.value
            }

            const somePerson = persons.filter(person=> person.name===newPerson.name)

            if (somePerson.length!==0){
                if (confirm(newPerson.name+" is already added to phonebook, replace the old number with a new one?")) {
                    const updatedPerson = { ...somePerson[0], number: newPerson.number };
                    services.update(updatedPerson.id, updatedPerson)
                        .then(returnedPerson => {
                            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                            setNotification({message:returnedPerson.name + " was updated",color:"green"})
                            setTimeout(()=>{
                                setNotification(null)
                            },5000)
                        })
                }
            }else {
                services.create(newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.concat(returnedPerson))
                        setNotification({message:returnedPerson.name + " was added",color:"green"})
                        setTimeout(()=>{
                            setNotification(null)
                        },5000)
                    })
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