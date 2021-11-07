
const totalLikes = require('../utils/list_helper').totalLikes

describe('totalLikes', () => {


  // simple data
  test('totalLikes test', () => {
    const testdata = [
      {likes: 30},
      {likes: 1},
      {likes: 3}
    ]
    const result = totalLikes(testdata)
    expect(result).toBe(34)
  })


  // data missing
  test('totalLikes data missing test', () => {
    const testdata = [
      {likes: 30},
      {name: "Mike"},
      {likes: 3}
    ]
    const result = totalLikes(testdata)
    expect(result).toBe(33)
  })
  

  // only one post 
  test('totalLikes test', () => {
    const testdata = [
      {likes: 12},
    ]
    const result = totalLikes(testdata)
    expect(result).toBe(12)
  })
})