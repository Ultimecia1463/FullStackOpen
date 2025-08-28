import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      console.log(e)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={
        ()=>{
          setUser(null)
          window.localStorage.clear()
        }
      }>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App