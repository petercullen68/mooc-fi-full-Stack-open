
import { create } from 'zustand'
import anecdotesService from "./services/anecdotes.js";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const newAnecdote = await anecdotesService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    remove: async (id) => {
      await anecdotesService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    initialize: async () => {
      const anecdotes = await anecdotesService.getAll()
      set(() => ({anecdotes}))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updated = await anecdotesService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(n => n.id === id ? updated : n)
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
  },
}))

export default useAnecdoteStore

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.toSorted((a, b) => b.votes - a.votes).filter(n => n.content.includes(filter))
}

export const useNotificationStore = create((set) => ({
  notification: null, // { message, type }

  actions: {
    show: (message, type = 'success') => {
      set({ notification: { message, type } })
      setTimeout(() => {
        set({ notification: null })
      }, 5000)
    },
    clear: () =>
      set({ notification: null }),
  }
}))
export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)