import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authed ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}
