import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'
import { MemoryRouter } from 'react-router-dom'


test('test 1 - Ensure the create button is handled correctly', async () => {
  const createBlog = vi.fn()
  render(
    <MemoryRouter>
      <CreateBlog handleCreate={createBlog} />
    </MemoryRouter>
  )
  const user = userEvent.setup()
  const titleText = screen.getByLabelText('Title')
  const createButton = screen.getByTestId('submit-create-blog-button')
  await user.type(titleText, 'testing a form...')
  await user.click(createButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith(
    'testing a form...',
    '',
    ''
  )})