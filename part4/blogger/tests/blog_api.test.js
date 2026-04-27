const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const testDataHelper = require('../utils/test_data_helper')

const api = supertest(app)


describe('miscellaneous api blogs test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

  test('blogs are returned as json', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('number of blogs returned is correct', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const resultsBlogs = await api
      .get('/api/blogs')
      .expect(200)

    assert.equal(resultsBlogs.body.length, 1)
  })

  test('blog contains id not _id in the body', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const resultsBlogs = await api
      .get('/api/blogs')
      .expect(200)

    assert(Object.hasOwn(resultsBlogs.body[0], 'id'))
  })
})

describe('update a blog test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })


  test('add a new blog and verify that is exists', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const resultsBlogs = await api
      .get('/api/blogs/' + addedBlog.body.id)
      .expect(200)

    assert.equal(resultsBlogs.body.id, addedBlog.body.id)
  })
})

describe('add a blog test', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

  test('add a new blog, with a valid token', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)
  })

  test('add a new blog, with a valid token, verify likes is 0 if missing', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.newBlogWithoutLikes)
      .expect(201)

    assert.equal(addedBlog.body.likes, 0)
  })

  test('add a new blog, without a valid token', async () => {
    await api
      .post('/api/blogs')
      .send(testDataHelper.fullNewBlog)
      .expect(401)
  })

  test('add a new blog without a url and verify a 400', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.newBlogWithoutUrl)
      .expect(400)
  })

  test('add a new blog without a url and verify a 400', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.newBlogWithoutTitle)
      .expect(400)
  })
})

describe('delete a blog test', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

  test('add a new blog, delete, same user', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    await api
      .delete('/api/blogs/' + addedBlog.body.id)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(204)

  })

  test('add a new blog, delete, no token', async () => {
    const newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    const login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    await api
      .delete('/api/blogs/' + addedBlog.body.id)
      .expect(401)
  })

  test('add a new blog, delete, different user', async () => {
    let newUser = {
      username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let loginRequest = {
      username: 'mluukkai', password: 'salainen'
    }

    let login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    newUser = {
      username: 'peter', name: 'pedro', password: 'pedrospassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    loginRequest = {
      username: 'peter', password: 'pedrospassword'
    }

    login = await api
      .post('/api/login')
      .send(loginRequest)
      .expect(200)

    await api
      .delete('/api/blogs/' + addedBlog.body.id)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(401)

  })
})


after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})