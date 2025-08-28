import { useEffect } from "react"

const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [message, setMessage])

  if (!message) {
    return null
  }

  const type = message.startsWith("success") ? "success" : "error"

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification