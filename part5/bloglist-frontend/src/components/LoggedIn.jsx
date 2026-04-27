import Notification from './Notification.jsx'

const LoggedIn = ({ visible, notification, user, handleLogout, setShowCreateNewBlog, showCreateNewBlog }) => {
  if (!visible) return null

  return (<div>
    <h2>blogs</h2>
    <Notification notification={notification}/>
    <p>{user.name} is logged in <button data-testid = "logout-button" onClick={() => handleLogout()}> Logout </button></p>
    {!showCreateNewBlog && <button onClick={() => setShowCreateNewBlog(true)} data-testid = "create-blog-button" > create new blog </button>}
  </div>)
}

export default LoggedIn
