

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



// exercise 4.9
test('Return correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  for (let each of response.body) {   
    expect(each.id).toBeDefined()
  }
})



// exercise 4.10
test.only('Testing POST', async () => {
  const originalBloglist = await api.get('/api/blogs')
  const newBlog = {
    title: "MeoMeo",
    author: "Monica",
    url: "aodiwjaod",
    likes: 123
  }

  await api
  .post('/api/blogs')
  .send(newBlog).expect(201)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(originalBloglist.body.length + 1)
})




afterAll(() => { // Jest command. Runs function after all tests completed
  mongoose.connection.close()
})
