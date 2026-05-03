import { create } from 'zustand'

export const useScoringStore = create(set => ({
  counters: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  actions: {
    incrementGood: () =>
      set(state => ({
        counters: {
          ...state.counters,
          good: state.counters.good + 1,
        },
      })),
    incrementNeutral: () =>
      set(state => ({
        counters: {
          ...state.counters,
          neutral: state.counters.neutral + 1,
        },
      })),
    incrementBad: () =>
      set(state => ({
        counters: {
          ...state.counters,
          bad: state.counters.bad + 1,
        },
      })),
  },
}))

export const useScores = () => useScoringStore(state => state.counters)
export const useScoreControls = () => useScoringStore(state => state.actions)