import React, { useState, useContext, useRef } from 'react'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { useInput } from '@/hooks'

import { logIn } from '@/services/Authenticate'
import { AuthContext } from '@/contexts/Auth'

import './styles.css'

export default function Login() {
  const email = useInput('')
  const password = useInput('')

  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState(null)

  const { authed, setAuthed } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email.value.trim() || !password.value.trim()) {
      return toast.error('Please fill in all the fields')
    }

    const payload = {
      email: email.value,
      password: password.value,
    }

    const clearForm = () => {
      email.setValue('')
      password.setValue('')
    }

    logIn(payload, clearForm)
  }

  return authed ? (
    <Redirect
      to={{
        pathname: '/private',
        state: { from: '/login' },
      }}
    />
  ) : (
    <React.Fragment>
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            value={email.value}
            onChange={email.onChange}
          />
          <input
            type="password"
            placeholder="password"
            value={password.value}
            onChange={password.onChange}
          />
          <div className="action input-group">
            <button>Login</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

// ;<span className="pointer" onClick={() => signup()}>
//   Signup instead
// </span>
