import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'

import Button from '@/components/Button'
import Icon from '@/components/Icon'

import './styles.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Icon />
          <h2> this is that react app you want. </h2>
        </div>
        <p className="App-intro">
          Run the <code> build </code> command to check out
          <code>purifycss</code> or click the button for some chunks & lazy
          loading.
        </p>
        <br />
        <Button />
      </div>
    )
  }
}

export default hot(App)
