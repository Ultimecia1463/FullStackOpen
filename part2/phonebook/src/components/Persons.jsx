import React from 'react'

const Persons = ({filter,persons}) => {
  return (
    <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter))
            .map(person=> <li key={person.id} >{person.name} {person.number} </li> )
        }
    </ul>
  )
}

export default Persons