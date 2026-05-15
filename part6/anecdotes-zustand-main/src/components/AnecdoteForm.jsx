import {useAnecdoteActions, useNotificationActions} from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { show }  = useNotificationActions();
  const addAnecdote = async (e) => {
    e.preventDefault()
    await add(e.target.anecdote.value)
    show(`Added: ${e.target.anecdote.value}`, 'success')
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