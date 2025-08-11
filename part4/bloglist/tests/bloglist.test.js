const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { log } = require('node:console')

const api = supertest(app)
const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 12
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.length, blogs.length)
})

test('blogs have an id property', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  response.body.forEach(blog => {
    assert.ok(blog.id, 'Blog does not have an id property')
  })
})

test('blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'http://newblog.com',
    likes: 5
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.length, blogs.length+1)
  assert.ok(response.body.some(blog => blog.title === newBlog.title), 'New blog was not added')
})

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Author',
    url: 'http://nolikes.com'
  }
  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.likes, 0, 'Likes should default to 0')
})

test('blog without title or url returns 400', async () => {
  const newBlog = {
    author: 'some Author',
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]
  
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
    .expect(200)
  assert.strictEqual(blogsAtEnd.body.length, blogs.length - 1, 'Blog was not deleted')
})

test('blog can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }
  const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.likes, updatedBlog.likes, 'Likes were not updated correctly')
})

after(async () => {
  await mongoose.connection.close()
})