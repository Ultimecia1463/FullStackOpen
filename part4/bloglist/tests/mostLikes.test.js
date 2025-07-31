const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('Most liked author', () => {
  const Blogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 12,
    }  
  ]
    
  test('The author with most likes', () => {
    const result = listHelper.mostLikes(Blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      likes: 22
    })
  })
})