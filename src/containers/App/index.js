import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
// import Loadable from 'react-loadable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '@/scenes/Home'
import Private from '@/scenes/Private'

import { AuthProvider } from '@/contexts/Auth'

import Header from '@/components/Header'
// import Loading from '@/components/Loading'

import { PublicRoute, NoMatchRoute, PrivateRoute } from '@/containers/Routes'

import './styles.css'

// const Home = Loadable({
//   loader: () => import(/** webpackChunkName: HomeScene */ '@/scenes/Home'),
//   loading: Loading,
// })

// const Private = Loadable({
//   loader: () =>
//     import(/** webpackChunkName: PrivateScene */ '@/scenes/Private'),
//   loading: Loading,
// })

const App = function () {
  return (
    <div className="App">
      <AuthProvider>
        <Switch key="app">
          <Header />
          <Route path="/">
            <Home />
          </Route>
          {/* <PublicRoute component={Home} exact path="/home" />
            <PrivateRoute component={Private} exact path="/private" />
            <Route component={NoMatchRoute} path="*" /> */}
        </Switch>
      </AuthProvider>
    </div>
  )
}

export default hot(App)
