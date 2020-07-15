import React from 'react'
import ReactDOM from 'react-dom'

import App from '@/containers/App'

import '#/index.css'

const renderApplication = (ApplicationComponent) =>
  ReactDOM.render(<ApplicationComponent />, document.getElementById('⚛'))

// Render the application.
renderApplication(App)
