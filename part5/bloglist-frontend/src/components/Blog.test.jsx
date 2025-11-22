import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'This is title',
      author: 'This is author',
      url: 'This is url',
      likes: 114514
    }
    container = render(<Blog blog={blog} />).container
  })

  test('Blog renders title and author by default', async () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('This is title')
    expect(div).toHaveTextContent('This is author')
  })

  test('Blog does not renders url and lilkes by default', async () => {
    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent('This is url')
    expect(div).not.toHaveTextContent(114514)
  })
})