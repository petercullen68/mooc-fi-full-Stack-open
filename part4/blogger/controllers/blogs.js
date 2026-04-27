const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find().populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (request.user === null) {
    return response.status(401).json({ error: 'Token or UserId missing or not valid' })
  }
  const user = request.user

  const blog = new Blog({
    title: body.title, author: body.author, likes: body.likes, url: body.url, user: request.user._id
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user')
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  if (request.user === null) {
    return response.status(401).json({ error: 'Token or UserId missing or not valid' })
  }
  const user = request.user
  const toDelete = await Blog.findById(request.params.id).populate('user')
  if (user.id.toString() !== toDelete.user.id.toString()) {
    response.status(401).end()
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    blog.likes = likes
    const changedBlog = await blog.save()
    await changedBlog.populate('user')
    response.json(changedBlog)
  } else {
    return response.status(404).end()
  }
})

module.exports = blogsRouter