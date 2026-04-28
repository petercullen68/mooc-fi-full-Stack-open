import BlogView from './BlogView.jsx'

import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
            <Link data-testid="blog-link" to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs