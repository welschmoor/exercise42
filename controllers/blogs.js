const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(blog => {
//     response.json(blog)
//   })
// })

blogsRouter.get('/', async (request, response) => {
  const allblogs = await Blog.find({})
  response.json(allblogs)
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




// Ex 4.11 solution (the if block)
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  if (!blog.likes && blog.likes !== 0) {
    blog.likes = 0
  }

  // ex 4.12
  // if (!blog.url || !blog.title) {
  //   response.status(400).end()
  // }

  if (!blog.title) {
    response.status(400).end()
  }

  console.log("blog<><><>", blog)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})





blogsRouter.delete('/:id', (request, response, next) => {
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