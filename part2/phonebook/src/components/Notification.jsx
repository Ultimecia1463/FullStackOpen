const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, color } = notification

  return <div className={color}>{message}</div>
}

export default Notification