const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = array => {
  const sum = function (items, prop) {
    return items.reduce(function (a, b) {
      return a + b[prop]
    }, 0)
  }
  return array.length === 0 ? 0 : sum(array, 'likes')
}

const favoriteBlog = array => {
  const maxBy = function (items, prop) {
    return items.reduce((max, item) => {
      return item[prop] > max[prop] ? item : max
    }, items[0])
  }
  return array.length === 0 ? null : maxBy(array, 'likes')
}

const mostBlogs = array => {
  const grouped = lodash.groupBy(array, 'author')

  const result = lodash.map(grouped, (items, author) => ({
    author, blogs: items.length,
  }))

  return array.length === 0 ? null : lodash.maxBy(result, 'blogs')
}

const mostLikes = array => {
  const grouped = lodash.groupBy(array, 'author')

  const result = lodash.map(grouped, (items, author) => ({
    author, likes: lodash.sumBy(items, 'likes'),
  }))

  return array.length === 0 ? null : lodash.maxBy(result, 'likes')
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}