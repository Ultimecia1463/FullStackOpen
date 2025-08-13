const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

usersRouter.post('/register', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || username.length < 3) {
    return response.status(400).json({ error: "Username missing or shorter than 3 symbols" })
  } else if (!password || password.length < 3) {
    return response.status(400).json({ error: "Password missing or shorter than 3 symbols" })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, config.JWT_SECRET)
  response.status(200).send({ token, username: user.username, name: user.name})
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRouter