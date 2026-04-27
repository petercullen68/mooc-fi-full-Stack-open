import BlogView from './BlogView.jsx'

import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>blogs</h1>
      <ul className="blog-list">
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