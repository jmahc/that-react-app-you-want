import React from 'react'

import App from '../App'

const Root = ({ story }) => {
  return <App>{story()}</App>
}

export default Root
