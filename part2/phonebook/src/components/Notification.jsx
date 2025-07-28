import { useEffect } from 'react'
const Notification = ({ notification , setNotification }) => {

  useEffect(()=>{
    setTimeout(() => {
      setNotification(null) 
    }, 3000)
  }, [notification])

  if (notification === null) {
    return null
  }

  const { message, color } = notification

  return <div className={color}>{message}</div>
}

export default Notification