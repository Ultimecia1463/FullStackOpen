import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const user = {
      username: 'This is username'
    }
    const blog = {
      title: 'This is title',
      author: 'This is author',
      url: 'This is url',
      likes: 114514,
      user: { name: 'This is user.name' }
    }
    container = render(<Blog user={user} blog={blog} />).container
  })

  test('Blog renders title and author by default', async () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('This is title')
    expect(div).toHaveTextContent('This is author')
  })

  test('Blog does not renders url and likes by default', async () => {
    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent('This is url')
    expect(div).not.toHaveTextContent(114514)
  })

  test('Blog renders url and likes when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('This is url')
    expect(div).toHaveTextContent(114514)
  })
})