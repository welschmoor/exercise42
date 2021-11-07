///////////////////////////

const dummy = (blogs) => {
  return 1
}


const totalLikes = (bloglist) => {
  return bloglist.reduce( (acc, each) => {
    return each.likes ? acc + each.likes : acc
  }, 0)
}


const favoriteBlog = (bloglist) => {
  const highestLikes = bloglist.reduce( (acc, each) => {
    return each.likes > acc ?  each.likes : acc;
   }, 0)
  return bloglist.find(each => each.likes === highestLikes )
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}