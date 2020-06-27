import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({
  component: Component,
  authed = false,
  ...rest
}) {
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
