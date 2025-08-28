import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  return (
    <>
      {
        (user===null) ?
        <LoginForm setUser={setUser} /> :
        <BlogList blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs} />
      }
    </>
  )
}

export default App