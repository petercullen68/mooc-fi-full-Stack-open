const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')
const testDataHelper = require('../utils/test_data_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testDataHelper.initialBlogs)
})

describe('miscellaneous api blogs test', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('number of blogs returned is correct', async () => {
    const resultsBlogs = await api
      .get('/api/blogs')
      .expect(200)
    assert.equal(resultsBlogs.body.length, testDataHelper.initialBlogs.length)
  })

  test('blog contains id not _id in the body', async () => {
    const resultsBlogs = await api
      .get('/api/blogs')
      .expect(200)
    assert(Object.hasOwn(resultsBlogs.body[0], 'id'))
  })
})

describe('update a blog test', () => {
  test('add a new blog and verify that is exists', async () => {
    const addedBlog = await api
      .post('/api/blogs')
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    const updatedBlog = await api
      .put('/api/blogs/' + addedBlog.body.id)
      .send(testDataHelper.updatesLikes)
      .expect(200)

    const resultsBlogs = await api
      .get('/api/blogs/'  + updatedBlog.body.id)
      .expect(200)

    assert.equal(resultsBlogs.body.likes, testDataHelper.updatesLikes.likes)
    assert(resultsBlogs.body.find(b => b.id === addedBlog.body.id))
  })
})

describe('delete a blog test', () => {
  test('add a new blog, verify it exist, delete and verify its gone', async () => {
    const addedBlog = await api
      .post('/api/blogs')
      .send(testDataHelper.fullNewBlog)
      .expect(201)

    const retrieveBlog = await api
      .get('/api/blogs/' + addedBlog.body.id)
      .expect(200)


    await api
      .delete('/api/blogs/' + retrieveBlog.body.id)
      .expect(204)

    await api
      .get('/api/blogs/' + addedBlog.body.id)
      .expect(404)
  })
})

describe('add a new blog test', () => {
  test('add a new blog and verify that is exists', async () => {
    const addedBlog = await api
      .post('/api/blogs')
      .send(testDataHelper.fullNewBlog)
      .expect(201)


    const resultsBlogs = await api
      .get('/api/blogs')
      .expect(200)

    assert.equal(resultsBlogs.body.length, testDataHelper.initialBlogs.length + 1)
    assert(resultsBlogs.body.find(b => b.id === addedBlog.body.id))
  })

  test('add a new blog without a like and verify likes is zero', async () => {

    const addedBlog = await api
      .post('/api/blogs')
      .send(testDataHelper.newBlogWithoutLikes)
      .expect(201)

    assert.equal(addedBlog.body.likes, 0)

  })

  test('add a new blog without a url and verify a 400', async () => {
    await api
      .post('/api/blogs')
      .send(testDataHelper.newBlogWithoutUrl)
      .expect(400)
  })

  test('add a new blog without an title and verify a 400', async () => {
    await api
      .post('/api/blogs')
      .send(testDataHelper.newBlogWithoutTitle)
      .expect(400)
  })
})


after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})