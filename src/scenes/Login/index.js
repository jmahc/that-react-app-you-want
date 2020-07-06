import React, { useState, useContext, useRef } from 'react'
import { Redirect } from 'react-router-dom'

import { logIn } from '@/services/Auth'
import { AuthContext } from '@/contexts/Auth'

const { authed, setAuthed } = useContext(AuthContext)

import './styles.css'

export default function Login() {
  return (
    <React.Fragment>
      <div className="Private">
        <h2>Login</h2>
        <form action="POST">
          <button type="submit" value={true} />
        </form>
      </div>
    </React.Fragment>
  )
}
