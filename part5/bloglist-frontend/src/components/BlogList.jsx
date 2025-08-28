import { useState } from "react"
import Blog from "./Blog"
import blogService from '../services/blogs'
import Notification from "./Notification"

const BlogList = ({blogs, user, setUser, setBlogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    try{
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`success : a new blog added ${title}`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      console.log(e)
      setMessage(`error : ${e.response.data.error}`)
    }
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification message={message} setMessage={setMessage} />
      <p>{user.username} logged in <button onClick={
        ()=>{
          setUser(null)
          window.localStorage.clear()
        }
      }>logout</button></p>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div><label>title:<input type="text" value={title} onChange={({target})=> setTitle(target.value)} /></label></div>
        <div><label>author:<input type="text" value={author} onChange={({target})=> setAuthor(target.value)} /></label></div>
        <div><label>url:<input type="text" value={url} onChange={({target})=> setUrl(target.value)} /></label></div>
        <button type='submit' >create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default BlogList