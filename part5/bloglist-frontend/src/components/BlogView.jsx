import { useNavigate, useParams } from 'react-router-dom'

const BlogView = ({ blogs, handleUpdateLikes, user, handleRemoveBlog }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)
  if (!blog) return null

  const blogStyle = {
    paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5
  }

  const removeBlog = async (id) => {
    const isRemoved = await handleRemoveBlog(id)
    if (isRemoved) {
      navigate('/')
    }
  }

  return (<div style={blogStyle} data-testid="blog">
    <h3>{blog.title} by {blog.author}</h3>
    <div>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div><div>
        {blog.likes} likes
        {user && (
          <button
            data-testid="like-button"
            onClick={() =>
              handleUpdateLikes(blog.id, blog.likes + 1, blog.title, blog.author, blog.url)
            }
          >
          like
          </button>
        )}
      </div>
      <div>Added by {blog.user.name}</div>
      {(blog.user.id === user?.id) &&
        <button data-testid="remove-button" onClick={() => removeBlog(blog.id)}>remove</button>}
    </div>
  </div>)
}

export default BlogView