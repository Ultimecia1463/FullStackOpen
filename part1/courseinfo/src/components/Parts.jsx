import React from 'react'

const Parts = (props) => {
  return (
    <>
        <p> {props.part.name} {props.part.exercises} </p>
    </>
  )
}

export default Parts