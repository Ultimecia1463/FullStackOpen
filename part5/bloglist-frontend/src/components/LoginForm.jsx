import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )
    } catch (e) {
      console.log(e.message)
      setMessage(`error : ${e.response.data.error}`)
    }
  }

  return (
    <>
      <h2>Log in to application</h2>
      <Notification message={message} setMessage={setMessage} />
      <form onSubmit={handleLogin} >
        <div>
          <label>
            username
            <input
              type='text'
              value={username}
              onChange={({target})=> setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password}
              onChange={({target})=> setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit' >login</button>
      </form>
    </>
  )
}

export default LoginForm