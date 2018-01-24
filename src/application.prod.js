import React from 'react'
import { render } from 'react-dom'

import App from '@/containers/App'

import '#/index.css'

const renderApplication = ApplicationComponent =>
  render(<ApplicationComponent />, document.getElementById('root'))

// Render the application.
renderApplication(App)
