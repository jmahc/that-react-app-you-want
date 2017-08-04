import React, { Component } from 'react'

import './Button.css'

class Button extends Component {
  constructor() {
    super()
    this.CodeSplittingComponentPropsText = null
  }
  handleOnClick() {
    import('@/components/CodeSplittingComponent/lazyText' /* webpackChunkName: "LazyText" */)
      .then(lazyTextResponse => {
        this.CodeSplittingComponentPropsText = lazyTextResponse.default
      })
      .then(() => {
        import('@/components/CodeSplittingComponent' /* webpackChunkName: "CodeSplittingComponent" */).then(
          CodeSplittingComponent => {
            this.Component = CodeSplittingComponent
            this.forceUpdate()
          }
        )
      })
  }

  render() {
    return this && this.Component && this.Component.default
      ? <this.Component.default
          lazyText={this.CodeSplittingComponentPropsText}
        />
      : <div>
          <button className="Button-big" onClick={() => this.handleOnClick()}>
            Click here to code split, yo!
          </button>
        </div>
  }
}

export default Button
