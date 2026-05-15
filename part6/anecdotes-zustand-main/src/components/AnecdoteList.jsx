import {useAnecdoteActions, useAnecdotes, useNotificationActions} from "../store.js";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions();
  const { show }  = useNotificationActions();

  const handleVote = async (anecdote) => {
    await vote(anecdote.id)
    show(`You voted for: ${anecdote.content}`, 'success')
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
              {anecdote.votes === 0 && (<button onClick={() => remove(anecdote.id)}>delete</button>)}
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList;