import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const doLogin = async event => {
    event.preventDefault()
    const success = await handleLogin(username, password)
    if (success) {
      setUsername('')
      setPassword('')
      navigate('/')
    }
  }

  return (<form onSubmit={doLogin}>
    <h2>log in to application</h2>
    <div>
      <label>
          username
        <input
          data-testid="username-input"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
          password
        <input
          data-testid="password-input"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
    </div>
    <button type="submit" data-testid = "login-button" >login</button>
  </form>)
}

export default Login