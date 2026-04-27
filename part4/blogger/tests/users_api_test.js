const { test, beforeEach, describe, after } = require('node:test')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/test_helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('user and password length checks', () => {
  test('creation failed with a username that is only 2 chars', async () => {
    const newUser = {
      username: '12', name: '12', password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

  })

  test('creation failed with a password that is only 2 chars', async () => {
    const newUser = {
      username: '1245', name: '12', password: '11',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

  })
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username with login', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root', name: 'Superuser', password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})