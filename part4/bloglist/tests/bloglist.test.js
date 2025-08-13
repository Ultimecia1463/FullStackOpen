const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
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
  }
]

const initialUser = {
  username: 'testuser',
  name: 'Test User',
  password: 'testpass'
}

describe('blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(initialUser.password, 10)
    const user = new User({ username: initialUser.username , name: initialUser.name, passwordHash })
    const savedUser = await user.save()

    const blogsWithUser = initialBlogs.map(blog => ({ ...blog, user: savedUser._id }))
    await Blog.insertMany(blogsWithUser)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
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
    const token = (await api.post('/api/users/login' )
      .send(initialUser)).body.token
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'http://newblog.com',
      likes: 5
    }

    await api.post('/api/blogs')
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert.ok(response.body.some(blog => blog.title === newBlog.title))
  })

  test('blog without likes defaults to 0', async () => {
    const token = (await api.post('/api/users/login' )
      .send(initialUser)).body.token
    const newBlog = {
      title: 'Blog without likes',
      author: 'Author',
      url: 'http://nolikes.com'
    }
    const response = await api.post('/api/blogs')
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title or url returns 400', async () => {
    const token = (await api.post('/api/users/login' )
      .send(initialUser)).body.token
    const newBlog = {
      author: 'some Author',
    }
    await api.post('/api/blogs')
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('blog can be deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)
  })

  test('blog can be updated', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]
    const updatedBlog = { likes: blogToUpdate.likes + 1 }

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, updatedBlog.likes)
  })
})

describe('user tests', () => {
  const initialUsers = [
    { username: 'testuser1', name: 'Test User 1', password: 'password123' },
    { username: 'testuser2', name: 'Test User 2', password: 'password456' }
  ]

  beforeEach(async () => {
    await User.deleteMany({})
    const hashedUsers = await Promise.all(
      initialUsers.map(async user => ({
        username: user.username,
        name: user.name,
        passwordHash: await bcrypt.hash(user.password, 10)
      }))
    )
    await User.insertMany(hashedUsers)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialUsers.length)
  })

  test('user can be registered', async () => {
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'newpassword'
    }

    const response = await api.post('/api/users/register')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body.id)
    assert.strictEqual(response.body.username, newUser.username)
  })

  test('invalid users are not created', async () => {
    const invalidUser = {
      username: 'nu',
      name: 'Invalid User',
      password: 'pw'
    }

    const response = await api.post('/api/users/register')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error, 'Username missing or shorter than 3 symbols')
  })
})

after(async () => {
  await mongoose.connection.close()
})