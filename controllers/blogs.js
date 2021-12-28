const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate("user")
  response.json(allBlogs)
})


blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})




// Ex 4.11 solution (the if block) . 4.20 solution
blogsRouter.post('/', middleware.tokenExtractor, async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id,
  })
  // if (!blog.likes && blog.likes !== 0) {
  //   blog.likes = 0
  // }
  // if (!blog.title) {
  //   response.status(400).end()
  // }


  // ex 4.12
  // if (!blog.url || !blog.title) {
  //   response.status(400).end()
  // }


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // response.json(savedBlog)
  response.status(201).json(savedBlog)
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})




// 4.21
blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response, next) => {
  const blogQ = await Blog.findById(request.params.id).populate("user")
  const decodedToken = jwt.verify(request.token, process.env.SECRET)


  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // const user = await User.findById(decodedToken.id)
  const user = request.user
  console.log("user::::", user)
  if (blogQ.user.username !== user) {
    return response.status(401).json({ error: "No permission, you are not the user"})
  }
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})



blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
    likes: body.important || 0,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter