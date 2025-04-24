import React from 'react'
import Parts from './Parts'

const Content = (props) => {
  return (
    <>
        <Parts part={props.p1} exercise={props.e1} />
        <Parts part={props.p2} exercise={props.e2} />
        <Parts part={props.p3} exercise={props.e3} />
    </>
  )
}

export default Content