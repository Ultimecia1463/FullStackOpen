import { useRef } from "react"
import Blog from "./Blog"
import blogService from '../services/blogs'
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"

const BlogList = ({blogs, user, setUser, setBlogs, setMessage}) => {
  blogs.sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`success a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
  }

  const updateBlog = (id, updatedBlog) => {
    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : {...b, likes: returnedBlog.likes}))
      })
    blogs.sort((a, b) => b.likes - a.likes)
  }

  const deleteBlog = (id) => {
    blogService.deleteOne(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  return (
    <>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={
        ()=>{
          setUser(null)
          window.localStorage.clear()
        }
      }>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </>
  )
}

export default BlogList