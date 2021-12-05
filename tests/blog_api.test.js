// npm test -- tests/blog_api.test.js

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const api = supertest(app)

describe('Blogs Post/Get/', () => {
  let token;
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({}) // this deletes all Users in DB 

    const passwordHash = await bcrypt.hash('hru', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const loginResp = await api
      .post('/api/login')
      .send({ username: "root", password: "hru" })

    token = loginResp.body.token
  })

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
  // test('Testing POST', async () => {
  //   const originalBloglist = await api.get('/api/blogs')
  //   const newBlog = {
  //     title: "MeoMeo",
  //     author: "Monica",
  //     url: "aodiwjaod",
  //     likes: 123
  //   }

  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog).expect(201)

  //   const response = await api.get('/api/blogs')
  //   expect(response.body.length).toBe(originalBloglist.body.length + 1)
  // })


  // exercise 4.23
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(originalBloglist.body.length + 1)
  })


  // exercise 4.23 changing test to accomodate token
  test('Testing likes defaulting to 0', async () => {
    // const originalBloglist = await api.get('/api/blogs')

    // likes not in this obj:
    const newBlog = {
      title: "LikeTest",
      author: "Johnny",
      url: "aodiwjaod",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const newBlogFromDB = response.body.find(each => each.title === "LikeTest")
    delete newBlogFromDB.id
    delete newBlogFromDB.user
    // console.log("0<><><>", response.body, "0<><><>")
    // console.log("1<><><>", newBlogFromDB, "1<><><>")
    // console.log("2<><><>", { ...newBlog, likes: 0 }, "2<><><>")
    expect(newBlogFromDB).toEqual({ ...newBlog, likes: 0 })

  })



  // exercise 4.23 changing test to accomodate token
  test("missing title and url props default to 400 error ", async () => {
    // title and url missing 

    const newBlog = {
      author: "Johnny",
      likes: 2,
    }
    await api.post("/api/blogs")
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
  })

  // exercise 4.23 extra test for 401
  test("Missing token returns status 401", async () => {
    const newBlog = {
      author: "Johnny",
      likes: 2,
    }
    await api.post("/api/blogs")
    .send(newBlog)
    .expect(401)
  })

})







afterAll(() => { // Jest command. Runs function after all tests completed
  mongoose.connection.close()
})
