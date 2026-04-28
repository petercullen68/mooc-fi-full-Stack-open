import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

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
      <h2>Create a new blog</h2>
      <div>
        <TextField
          data-testid="title-input"
          sx={{ width: 450 }}
          label = "Title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <TextField
          data-testid="author-input"
          sx={{ width: 450 }}
          label = "Author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <TextField
          sx={{ width: 450 }}
          data-testid="url-input"
          label = "Url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <Button type="submit" data-testid="submit-create-blog-button" variant="contained" style={{ marginTop: 10 }}>Create</Button>
      <Button type="button" onClick={() => handleCancel()} variant="contained" style={{ marginTop: 10, marginLeft:10 }}>Cancel</Button>
    </form>
  </div>)
}

export default CreateBlog