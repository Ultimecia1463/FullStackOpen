const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  let user = await User.findOne()
  const blog = new Blog(request.body)
  blog.user = user._id

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const updatedBlog = request.body
  const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  response.json(result)
})

module.exports = blogsRouter