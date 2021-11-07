const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogslist) => {
  return blogslist.reduce( (acc, each) => {
    return each.likes ? acc + each.likes : acc
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
}