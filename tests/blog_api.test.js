

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
test('Testing POST', async () => {
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


// exercise 4.11
test('Testing likes defaulting to 0', async () => {
  const originalBloglist = await api.get('/api/blogs')

  // likes not in this obj:
  const newBlog = {
    title: "LikeTest",
    author: "Johnny",
    url: "aodiwjaod",
  }

  await api
  .post('/api/blogs')
  .send(newBlog).expect(201)

  const response = await api.get('/api/blogs')
  const newBlogFromDB = response.body.find(each=> each.title == "LikeTest")
  delete newBlogFromDB.id
  console.log("0<><><>", response.body, "0<><><>" )
  console.log("1<><><>", newBlogFromDB, "1<><><>" )
  console.log("2<><><>", {...newBlog, likes: 0} , "2<><><>" )
  expect(newBlogFromDB).toEqual({...newBlog, likes: 0})

})



// exercise 4.12
test.only("missing title and url props default to 400 error ", async () => {
  // title and url missing 

  const newBlog = {
    author: "Johnny",
    likes: 2,
  }
  await api.post("/api/blogs").send(newBlog).expect(400)
})





afterAll(() => { // Jest command. Runs function after all tests completed
  mongoose.connection.close()
})
