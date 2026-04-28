import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

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

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={doLogin}>
        <div>
          <TextField
            data-testid="username-input"
            label = "Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <TextField
            data-testid="password-input"
            label = "Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <Button type="submit" data-testid = "login-button" variant="contained" style={{ marginTop: 10 }}>Login</Button>
      </form>
    </div>)
}

export default Login