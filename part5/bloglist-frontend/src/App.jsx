import { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import axios from 'axios'
import Login from './components/Login.jsx'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Notification from './components/Notification.jsx'
import BlogView from './components/BlogView.jsx'
import CreateBlog from "./components/CreateBlog.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [showCreateNewBlog, setShowCreateNewBlog] = useState(false)


  const displayNotification = (message, type) => {
    const newNotification = {
      message: message, type: type
    }
    setNotification(newNotification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const nameOfLsObject = 'loggedInBlogUser'

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem(nameOfLsObject)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.sessionStorage.setItem(nameOfLsObject, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      return true
    } catch {
      displayNotification('wrong credentials', 'error')
      return false
    }
  }

  const handleCreate = async (title, author, url) => {
    try {
      const newBlog = { title, author, url }
      const addedBlog = await blogService.create(newBlog)
      displayNotification(`a new blog ${addedBlog.title} by ${addedBlog.author} added`, 'success')
      setBlogs(blogs.concat(addedBlog))
      setShowCreateNewBlog(false)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || error.response?.data || error.message
        displayNotification(message, 'error')
        return false
      } else {
        displayNotification('Unknown error', 'error')
        return false
      }
    }
  }

  const handleUpdateLikes = async (id, likes, title, author, url) => {
    try {
      const newLikes = { title, author, url, likes }
      const updatedLikes = await blogService.update(id, newLikes)
      setBlogs(blogs.map(blog => blog.id === updatedLikes.id ? updatedLikes : blog))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || error.response?.data || error.message
        displayNotification(message, 'error')
      } else {
        displayNotification('Unknown error', 'error')
      }
    }
  }

  const handleRemoveBlog = async (id) => {
    const blogToRemove = blogs.find(x => x.id === id)
    if (window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id))
        return true
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.error || error.response?.data || error.message
          displayNotification(message, 'error')
        } else {
          displayNotification('Unknown error', 'error')
        }
      }
      return false
    }
  }

  const handleLogout = async () => {
    window.sessionStorage.removeItem(nameOfLsObject)
    setUser(null)
  }

  const padding = {
    padding: 5
  }

  return (<Router>
    <div>
      <Notification notification={notification}/>
      <Link data-testid="link-blogs" style={padding} to="/">blogs</Link>
      {user !== null && (<Link data-testid="link-create-blog" style={padding} to="/newblog">new blog</Link>)}
      {user === null ? (<Link data-testid="link-login" style={padding} to="/login">login</Link>) : (
        <button data-testid="logout-button" style={padding} onClick={handleLogout}>
          logout
        </button>)}
    </div>
    <Routes>
      <Route path="/login" element={<Login
        handleLogin={handleLogin}/>}/>
      <Route path="/" element={<Blogs
        blogs={blogs}/>}/>
      <Route path="/blogs/:id"
        element={<BlogView blogs={blogs} handleUpdateLikes={handleUpdateLikes} user={user} handleRemoveBlog={handleRemoveBlog}/>}/>
      <Route path="/newblog"
        element={<CreateBlog handleCreate={handleCreate}/>}/>
    </Routes>
  </Router>)
}

export default App