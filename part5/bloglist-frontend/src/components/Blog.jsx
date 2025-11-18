import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {

  const [visible, setVisible] = useState(false)

  const buttonLable = visible === false ? 'view' : 'hide'

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    updateBlog(blog.id, blogObject)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisible}>{buttonLable}</button>
      </div>
      {visible === true &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      }
    </div>  
  )
}

export default Blog