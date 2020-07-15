import React, { useContext, useEffect } from 'react'

import { logOut } from '@/services/Authenticate'
import { AuthContext } from '@/contexts/Auth'

export default function LogOut() {
  const { setAuthed } = useContext(AuthContext)

  useEffect(() => {
    logOut()
    setAuthed(false)
  }, [])

  return <h2>Logging out...</h2>
}
