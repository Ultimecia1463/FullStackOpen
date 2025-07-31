const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
}

const mostBlogs = (blogs) => {
  const authorCount = _.countBy(blogs, 'author')
  
  return _.reduce(authorCount, (max, count, author)=> {
    if (count > max.count) {
      return { author, count }
    }
    return max
  },{ author: '', count: 0 })
}

const mostLikes = (blogs) => {
  const maxAuthor = _.chain(blogs)
  .groupBy('author')
  .map((arr, author) => ({
    author,
    likes: _.sumBy(arr, 'likes')
  }))
  .maxBy('likes')
  .value()
  
  return maxAuthor
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}