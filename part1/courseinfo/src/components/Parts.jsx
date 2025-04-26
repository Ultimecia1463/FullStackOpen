import React from 'react'

const Parts = (props) => {
  return (
    <>
        <p> {props.part.name} {props.part.exercise} </p>
    </>
  )
}

export default Parts