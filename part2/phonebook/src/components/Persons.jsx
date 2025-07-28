import React from 'react'
import services from '../services/persons'

const Persons = ({filter,persons,setPersons}) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter))
        .map(person=> <li key={person.id} >{person.name} {person.number}
          <button onClick={()=>{
            if(confirm("delete "+person.name)) {
              services
                .drop(person.id)
                .then(()=>setPersons(persons.filter(n => n.id !== person.id)))
                .catch(error => console.log(error))
            }
          }} >
            Delete
          </button>
        </li> )
      }
    </ul>
  )
}

export default Persons