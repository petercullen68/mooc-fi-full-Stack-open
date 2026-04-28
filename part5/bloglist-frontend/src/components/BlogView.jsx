import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'

const BlogView = ({ blogs, handleUpdateLikes, user, handleRemoveBlog }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)
  if (!blog) return null

  const removeBlog = async (id) => {
    const isRemoved = await handleRemoveBlog(id)
    if (isRemoved) {
      navigate('/')
    }
  }

  return (<Card sx={{ maxWidth: 500, mt: 2 }} data-testid="blog">
    <CardContent>

      <Typography variant="h6">
        {blog.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        by {blog.author}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </Box>

      <Typography sx={{ mb: 1 }}>
        Added by {blog.user.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography>{blog.likes} likes</Typography>

        {user && (
          <Button
            variant="outlined"
            size="small"
            data-testid="like-button"
            onClick={() =>
              handleUpdateLikes(blog.id, blog.likes + 1, blog.title, blog.author, blog.url)
            }
          >
            LIKE
          </Button>
        )}

        {(blog.user.id === user?.id) && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            data-testid="remove-button"
            onClick={() => removeBlog(blog.id)}
          >
            REMOVE
          </Button>
        )}
      </Box>

    </CardContent>
  </Card>)
}

export default BlogView