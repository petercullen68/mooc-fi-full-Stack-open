import { render, screen } from '@testing-library/react'
import useAnecdoteStore from '../store'
import AnecdoteList from './AnecdoteList'
import {vi} from "vitest";

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))


test('renders only filtered anecdotes', () => {
  // 1. Set initial state
  useAnecdoteStore.setState({
    anecdotes: [
      { id: 1, content: 'React is great', votes: 0 },
      { id: 2, content: 'Zustand is simple', votes: 0 },
      { id: 3, content: 'Redux is powerful', votes: 0 },
    ],
    filter: 'React'

  })

  // 2. Render component
  render(<AnecdoteList />)

  // 3. Assertions
  expect(screen.queryByText('React is great')).not.toBeNull()
  expect(screen.queryByText('Zustand is simple')).toBeNull()
  expect(screen.queryByText('Redux is powerful')).toBeNull()
})