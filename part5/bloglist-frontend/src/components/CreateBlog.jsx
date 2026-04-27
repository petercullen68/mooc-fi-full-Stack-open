import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBlog = ({ handleCreate }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearAndNavigate = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
    navigate('/')
  }

  const createBlog = async event => {
    event.preventDefault()
    const success = await handleCreate(title, author, url)
    if (success) clearAndNavigate()
  }

  const handleCancel = async () => {
    clearAndNavigate()
  }

  return (<div>
    <form onSubmit={createBlog}>
      <h2>create new</h2>
      <div>
        <label>
            title:
          <input data-testid="title-input"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
            author:
          <input data-testid="author-input"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
            url:
          <input data-testid="url-input"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit" data-testid="submit-create-blog-button" > create</button>
      <button type="button" onClick={() => handleCancel()}> cancel</button>
    </form>
  </div>)
}

export default CreateBlog