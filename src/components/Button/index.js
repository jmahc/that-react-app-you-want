import React, { Component } from 'react'

import '@/components/Button/styles.css'

class Button extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Component: null,
      lazyText: null
    }
  }
  handleOnClick() {
    /**
     * Import the "lazy" text from the component file using the `import()` ES6 proposal syntax.
     */
    import('@/components/CodeSplittingComponent/lazyText' /* webpackChunkName: "LazyText" */)
      /**
       * Pass the "lazy text" to the next `then` method to only `this.setState()` once
       * and trimming down the number of times that the component renders.
       */
      .then(lazyTextResponse => lazyTextResponse)
      .then(lazyText => {
        import('@/components/CodeSplittingComponent' /* webpackChunkName: "CodeSplittingComponent" */).then(
          LoadedComponent => {
            /**
             * Set the state for the component and text using the default exports.
             */
            this.setState({
              Component: LoadedComponent.default,
              lazyText: lazyText.default
            })
          }
        )
      })
  }

  render() {
    const { Component, lazyText } = this.state

    return (
      <div>
        {Component ? (
          <Component lazyText={lazyText} />
        ) : (
          <button className="Button-big" onClick={() => this.handleOnClick()}>
            Click here to code split, yo!
          </button>
        )}
      </div>
    )
  }
}

export default Button
