import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

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
  
  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setMessage("error wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  return (
    <>
      <Notification message={message} setMessage={setMessage} />
      {
        (user===null) ?
        <LoginForm login={login} /> :
        <BlogList blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs} setMessage={setMessage} />
      }
    </>
  )
}

export default App