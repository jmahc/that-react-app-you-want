import { hot } from 'react-hot-loader/root'
import React from 'react'
import loadable from '@loadable/component'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import { AuthProvider } from '@/contexts/Auth'

import Header from '@/components/Header'
import Loading from '@/components/Loading'

import { PublicRoute, NoMatchRoute, PrivateRoute } from '@/containers/Routes'

import './styles.css'

const LoadableComp = { fallback: <Loading /> }

const HomePage = loadable(() => import('@/scenes/Home'), LoadableComp)
const AboutPage = loadable(() => import('@/scenes/About'), LoadableComp)
const LoginPage = loadable(() => import('@/scenes/Login'), LoadableComp)
const LogoutPage = loadable(() => import('@/scenes/Logout'), LoadableComp)
const PrivatePage = loadable(() => import('@/scenes/Private'), LoadableComp)

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <div className="App">
          <Router>
            <div>
              <Header />
              <Switch key="app">
                <PublicRoute component={HomePage} exact path="/home" />
                <PublicRoute component={AboutPage} exact path="/about" />
                <PublicRoute component={LoginPage} exact path="/login" />
                <PrivateRoute component={LogoutPage} exact path="/logout" />
                <PrivateRoute component={PrivatePage} exact path="/private" />
                <PrivateRoute exact path="/">
                  <Redirect to="/private" />
                </PrivateRoute>
                <Route component={NoMatchRoute} path="*" />
              </Switch>
            </div>
          </Router>
        </div>
      </AuthProvider>
    </React.Fragment>
  )
}

export default hot(App)
