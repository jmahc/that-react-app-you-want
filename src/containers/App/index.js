import React, { Component } from 'react'

// import Button from '@/components/Button'
// import Icon from '@/components/Icon'

/*
  - Uncommenting the line below will break the linter.
  - However, if you do include it, you will notice that when building,
    `purifycss` removes any unused CSS.
 */
// import PurifiedCss from '@/containers/PurifiedCss'

// import './styles.css'

class App extends Component {
  render() {
    return (
      <div>
        <p>Hey nick!</p>
        <div className="App-header">
          <h2>this is that-react-app-you-want.</h2>
        </div>
        <p className="App-intro">
          Run the <code>build</code> command to check out <code>purifycss</code>{' '}
          or click the button for some chunks & lazy loading.
        </p>
        <br />
      </div>
    )
  }
}

export default App
