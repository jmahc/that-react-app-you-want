import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'
import './index.css'

const renderApp = ShowMeMyComponent => {
  render(
    <AppContainer>
      <ShowMeMyComponent />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderApp(App)
  })
}
