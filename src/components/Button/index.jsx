import React, { Component } from 'react'

import './Button.css'

class Button extends Component {
  constructor() {
    super()

    this.CodeSplittingComponentPropsText = null
  }
  handleOnClick() {
    // Import (lazy-load) the "lazy" text from the component file.
    // prettier-ignore
    import('@/components/CodeSplittingComponent/lazyText' /* webpackChunkName: "LazyText" */)
      .then(lazyTextResponse => {
        this.CodeSplittingComponentPropsText = lazyTextResponse.default
      })
      .then(() => {
        // Once imported, pass the "lazy" text as a prop to the `CodeSplittingComponent`.
        // prettier-ignore
        import('@/components/CodeSplittingComponent' /* webpackChunkName: "CodeSplittingComponent" */).then(
          CodeSplittingComponent => {
            // Assign `this.Component` to the component that was lazily loaded.
            this.Component = CodeSplittingComponent
            this.forceUpdate()
          }
        )
      })
  }

  render() {
    /*
      - Using `this.Component`, if it exists, which is untrue on initialization,
        return the object's default value (the component itself).
      - Otherwise, load the button that will be replaced!
     */
    return this && this.Component && this.Component.default ? (
      <this.Component.default lazyText={this.CodeSplittingComponentPropsText} />
    ) : (
      <div>
        <button className="Button-big" onClick={() => this.handleOnClick()}>
          Click here to code split, yo!
        </button>
      </div>
    )
  }
}

export default Button
