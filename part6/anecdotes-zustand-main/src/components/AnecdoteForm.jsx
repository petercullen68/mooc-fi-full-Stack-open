import {useAnecdoteActions} from "../store.js";

const AnecdoteForm = () => {
  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const { add } = useAnecdoteActions();
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add({ id: generateId(), content, votes: 0 })
    e.target.reset()
  }

  return (<div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  </div>)
}

export default AnecdoteForm;