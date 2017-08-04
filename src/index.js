import React from 'react'
import { render } from 'react-dom'

import App from '@/containers/App'

import '@/index.css'

const isProduction = process.env.NODE_ENV === 'production'
const rootElement = document.getElementById('root')

const renderApplication = ApplicationComponent => {
  // Disregard HMR for production builds.
  if (isProduction) {
    render(<ApplicationComponent />, rootElement)
  } else {
    const AppContainer = require('react-hot-loader').AppContainer
    // Trick babel to avoid hoisting `<AppContainer />`
    // via `babel-plugin-transform-react-constant-elements`.
    // Found here:
    // ~ https://github.com/LWJGL/lwjgl3-www/
    const noHoist = {}

    render(
      <AppContainer {...noHoist}>
        <ApplicationComponent />
      </AppContainer>,
      rootElement
    )
  }
}

// Render the application.
renderApplication(App)

if (!isProduction && module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default

    renderApplication(NewApp)
  })
}
