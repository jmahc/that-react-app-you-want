import React, { useState } from 'react'

import { getToken } from '@/services/LocalStorage'

export const AuthContext = React.createContext({
  authed: getToken(),
  setAuthed: () => {},
})

export const AuthProvider = (props) => {
  const [authed, setAuthed] = useState(getToken())

  return (
    <AuthContext.Provider value={{ authed, setAuthed }}>
      {props.children}
    </AuthContext.Provider>
  )
}
