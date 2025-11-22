import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('call createBlog with right details when clicking create', async () => {
    const addBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlog={addBlog} />)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Testtitle')
    await user.type(authorInput, 'Testauthor')
    await user.type(urlInput, 'Testurl')
    await user.click(createButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Testtitle')
    expect(addBlog.mock.calls[0][0].author).toBe('Testauthor')
    expect(addBlog.mock.calls[0][0].url).toBe('Testurl')
  })
})