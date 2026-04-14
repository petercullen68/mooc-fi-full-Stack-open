const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testDataHelper = require('../utils/test_data_helper')

test('dummy returns one', () => {
  const result = listHelper.dummy()
  assert.strictEqual(result, 1)
})


describe('total likes', () => {



  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testDataHelper.firstInitialBlog())
    assert.strictEqual(result, 7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testDataHelper.initialBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blogs', () => {
  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, id is equal to', () => {
    const result = listHelper.favoriteBlog(testDataHelper.firstInitialBlog())
    assert.strictEqual(result._id,'5a422a851b54a676234d17f7')
  })

  test('of a bigger list id is returned correctly', () => {
    const result = listHelper.favoriteBlog(testDataHelper.initialBlogs)
    assert.strictEqual(result._id,'5a422b3a1b54a676234d17f9')
  })
})

describe('most blogs', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, author is equal to', () => {
    const result = listHelper.mostBlogs(testDataHelper.firstInitialBlog())
    assert.strictEqual(result.author,'Michael Chan')
    assert.strictEqual(result.blogs,1)
  })

  test('of a bigger list id is returned correctly', () => {
    const result = listHelper.mostBlogs(testDataHelper.initialBlogs)
    assert.strictEqual(result.author,'Robert C. Martin')
    assert.strictEqual(result.blogs,3)
  })
})

describe('most likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, author and like are equal to', () => {
    const result = listHelper.mostLikes(testDataHelper.firstInitialBlog())
    assert.strictEqual(result.author,'Michael Chan')
    assert.strictEqual(result.likes,7)
  })

  test('of a bigger list id is returned correctly', () => {
    const result = listHelper.mostLikes(testDataHelper.initialBlogs)
    assert.strictEqual(result.author,'Edsger W. Dijkstra')
    assert.strictEqual(result.likes,17)  })
})