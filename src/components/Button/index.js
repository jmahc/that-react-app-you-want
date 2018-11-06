import * as React from 'react'

import { ButtonBig, ButtonContainer } from './styles'

export default class Button extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      CodeSplitComponent: null,
      lazyText: null,
    }
  }

  handleOnClick() {
    /**
     * Import the "lazy" text from the component file using the `import()` ES6 proposal syntax.
     */
    return (
      import('@/components/CodeSplittingComponent/lazyText' /* webpackChunkName: "LazyText" */)
        /**
         * Pass the "lazy text" to the next `then` method to only `this.setState()` once
         * and trimming down the number of times that the component renders.
         */
        .then(lazyTextResponse => lazyTextResponse.lazyText)
        .then(lazyText => {
          import('@/components/CodeSplittingComponent' /* webpackChunkName: "CodeSplittingComponent" */).then(
            LoadedComponent => {
              /**
               * Set the state for the component and text using the default export from the `LoadedComponent
               */
              this.setState({
                CodeSplitComponent: LoadedComponent.default,
                lazyText,
              })
            },
          )
        })
    )
  }

  render() {
    const { CodeSplitComponent, lazyText } = this.state

    return (
      <ButtonContainer>
        {CodeSplitComponent ? (
          <CodeSplitComponent text={lazyText} />
        ) : (
          <ButtonBig onClick={() => this.handleOnClick()}>
            Click here to code split, yo!
          </ButtonBig>
        )}
      </ButtonContainer>
    )
  }
}
