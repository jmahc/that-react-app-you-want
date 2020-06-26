import React from 'react'
import { render } from 'react-dom'
// @ resolves to `src/`
import App from '@/containers/App'
// # resolves to `src/shared/styles/`
import '#/index.css'

const renderApplication = ApplicationComponent => {
  const AppContainer = require('react-hot-loader').AppContainer
  // Trick babel to avoid hoisting `<AppContainer />`
  // via `babel-plugin-transform-react-constant-elements`.
  // Discussed here: https://github.com/LWJGL/lwjgl3-www/
  const noHoist = {}

  render(
    <AppContainer {...noHoist}>
      <ApplicationComponent />
    </AppContainer>,
    document.getElementById('⚛')
  )
}

// Render the application.
renderApplication(App)

if (module.hot) {
  module.hot.accept('@/containers/App', () => {
    const NewApp = require('@/containers/App').default

    renderApplication(NewApp)
  })
}
