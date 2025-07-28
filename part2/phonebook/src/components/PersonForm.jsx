import React from 'react' 
import services from '../services/persons' 

const PersonForm = ({ persons, setPersons, setNotification }) => {
  const handleSubmit = (e) => {
    e.preventDefault() 
    const newPerson = {
      name: e.target.name.value,
      number: e.target.number.value,
    } 

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    ) 

    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with the new one?`)) {
        const updatedPerson = {
          ...existingPerson,
          number: newPerson.number,
        } 
        services
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            ) 
            setNotification({
              message: `${returnedPerson.name} was updated`,
              color: 'green',
            }) 
          })
          .catch((error) => {
            setNotification({
              message: `[ERROR] ${updatedPerson.name} was already deleted from server`,
              color: 'red',
            }) 
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            )  
            console.log(error.response.data) 
          })
      }
    } else {
      services
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson)) 
          setNotification({
            message: `${returnedPerson.name} was added`,
            color: 'green',
          })
        })
        .catch((error) => {
          setNotification({
            message: `[ERROR] ${error.response.data.error}`,
            color: 'red',
          })
          console.log(error.response.data) 
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
