import { render, screen } from '@testing-library/react'
import BlogView from './BlogView.jsx'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const blogs = [
  {
    id: '1',
    title: 'Test Case Title',
    author: 'Test Case Author',
    url: 'Test Case Url',
    likes: 992211,
    user: {
      name: 'Test Case 1 User',
      id: '1'
    }
  }
]

const differentUser = {
  name: 'Different user',
  id: '2'
}

test('Blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed', () => {
  render (
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={blogs}
              handleUpdateLikes={() => {}}
              handleRemoveBlog={() => {}}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
  expect(screen.getByText(/Test Case Title/)).toBeInTheDocument()
  expect(screen.getByText(/Test Case Author/)).toBeInTheDocument()
  expect(screen.getByText(/Test Case Url/)).toBeInTheDocument()
  expect(screen.getByText(/likes/)).toBeInTheDocument()
  expect(screen.queryAllByTestId('like-button')).toHaveLength(0)
  expect(screen.queryAllByTestId('remove-button')).toHaveLength(0)
})

test('Authenticated users who are not the blogs creator are shown only the like button', async () => {
  render (
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              user={differentUser}
              blogs={blogs}
              handleUpdateLikes={() => {}}
              handleRemoveBlog={() => {}}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
  expect(screen.queryAllByTestId('like-button')).toHaveLength(1)
  expect(screen.queryAllByTestId('remove-button')).toHaveLength(0)
})

test('The blog’s creator is also shown the delete button', async () => {
  render (
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              user={blogs[0].user}
              blogs={blogs}
              handleUpdateLikes={() => {}}
              handleRemoveBlog={() => {}}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
  expect(screen.queryAllByTestId('like-button')).toHaveLength(1)
  expect(screen.queryAllByTestId('remove-button')).toHaveLength(1)
})