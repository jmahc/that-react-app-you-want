import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '@/containers/App'

import '#/index.css'

const renderApplication = (ApplicationComponent) =>
  ReactDOM.render(
    <Router>
      <ApplicationComponent />
    </Router>,
    document.getElementById('⚛'),
  )

// Render the application.
renderApplication(App)
