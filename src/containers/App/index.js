import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import Loadable from 'react-loadable'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'

import Header from '@/components/Header'
import Loading from '@/components/Loading'

import { PublicRoute, NoMatchRoute, PrivateRoute } from '@/containers/Routes'

import './styles.css'

const Home = Loadable({
  loader: () => import(/** webpackChunkName: HomeScene */ '@/scenes/Home'),
  loading: Loading,
})

const Private = Loadable({
  loader: () =>
    import(/** webpackChunkName: PrivateScene */ '@/scenes/Private'),
  loading: Loading,
})

const App = function () {
  return (
    <div className="App">
      <Router>
        <Switch key="app">
          <Header />
          <PublicRoute component={Home} exact path="/home" />
          <PrivateRoute component={Private} exact path="/private" />
          <Route component={NoMatchRoute} path="*" />
        </Switch>
      </Router>
    </div>
  )
}

export default hot(App)
