import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { AuthContext } from '@/contexts/Auth'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authed } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
