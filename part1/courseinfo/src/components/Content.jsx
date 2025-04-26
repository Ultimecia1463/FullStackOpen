import React from 'react'
import Parts from './Parts'

const Content = (props) => {
  return (
    <>
        <Parts part= { props.course.parts[0] } />
        <Parts part= { props.course.parts[1] } />
        <Parts part= { props.course.parts[2] } />
    </>
  )
}

export default Content