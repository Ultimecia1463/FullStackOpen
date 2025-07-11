import React from 'react'

const Filter = ({setFilter}) => {
  return (
    <form>
        filter numbers with <input onChange={e => setFilter(e.target.value.toLowerCase())}/>
    </form>
  )
}

export default Filter