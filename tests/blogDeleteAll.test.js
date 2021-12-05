// npm test -- tests/blogDeleteAll.test.js
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


describe('Delete all blog entries in DB', () => {
  // this deletes all blogposts
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({}) // this deletes all Users in DB 

  })

  // this is a throwaway test, so that beforeEach runs (at least one test required)
  test('throwaway test', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ba',
      name: 'Mike Sanders',
      password: 'booyahaha!1'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


})


afterAll(() => {
  mongoose.connection.close()
})