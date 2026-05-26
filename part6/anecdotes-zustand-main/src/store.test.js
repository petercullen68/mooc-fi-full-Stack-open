import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdotesService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'


beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('anecdote store test', () => {
  it('6.12 Anecdotes, step11', async () => {
    const mockAnecdotes = [{ id: 1, content: '6.12 Anecdotes, step11 - Test 1', votes: 3 }, { id: 2, content: '6.12 Anecdotes, step11 - Test 2', votes: 2 }, { id: 3, content: '6.12 Anecdotes, step11 - Test 3', votes: 1 }]
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(mockAnecdotes)
  })

  it('6.12 Anecdotes, step12', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test 1', votes: 1 }, { id: 2, content: 'Test 2', votes: 2 }, { id: 3, content: 'Test 3', votes: 3 }]
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0].content).toBe('Test 3')
    expect(anecdoteResult.current[1].content).toBe('Test 2')
    expect(anecdoteResult.current[2].content).toBe('Test 1')
  })


  it('6.15 Anecdotes, step14', async () => {
    const newAnecdote = { id: 1, content: 'Test', votes: 1 }
    useAnecdoteStore.setState({ anecdotes: [newAnecdote] })
    anecdotesService.update.mockResolvedValue({ ...newAnecdote, votes: 2 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(1)
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0].votes).toBe(2)
  })
})