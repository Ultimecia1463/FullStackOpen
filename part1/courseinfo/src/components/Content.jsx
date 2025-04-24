import React from 'react'

const Content = (props) => {
  return (
    <>
        <p>
            {props.p1} {props.e1}
        </p>
        <p>
            {props.p2} {props.e2}
        </p>
        <p>
            {props.p3} {props.e3}
        </p>
    </>
  )
}

export default Content