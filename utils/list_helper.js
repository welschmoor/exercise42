///////////////////////////

const dummy = (blogs) => {
  return 1
}

// returns 
const totalLikes = (bloglist) => {
  return bloglist.reduce( (acc, each) => {
    return each.likes ? acc + each.likes : acc
  }, 0)
}


// returns blog with most likes  Exercise4.5
const favoriteBlog = (bloglist) => {
  const highestLikes = bloglist.reduce( (acc, each) => {
    return each.likes > acc ?  each.likes : acc;
   }, 0)
  return bloglist.find(each => each.likes === highestLikes )
}


// return author with most blogposts Exercise4.6
const mostBlogs = bloglist => {
  const tempObj = {}

  bloglist.forEach(each => {
    if (!tempObj[each.author]) {
      tempObj[each.author] = 1
    
    } else {
      tempObj[each.author] += 1
    }
  })

  return {
    author: Object.keys(tempObj).reduce( (a,e) => tempObj[e] > tempObj[a] ? e : a),
    blogs: Object.values(tempObj).reduce( (a,e) => e > a ? e : a),
  }
}


// return author whose posts have the most likes
const mostLikes = blogs => {
  const tempObj = {}
  blogs.forEach(each => {
    if (!tempObj[each.author]) {
      tempObj[each.author] = each.likes
    } else {
      tempObj[each.author] += each.likes
    }
  })

  return {
    author: Object.keys(tempObj).reduce( (a, e) => tempObj[e] > tempObj[a] ? e : a),
    likes: Object.values(tempObj).reduce ( (a, e) => e > a ? e : a)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}