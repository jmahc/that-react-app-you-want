import React from 'react'
import PropTypes from 'prop-types'

import { CodeSplittingButton } from './styles'

const CodeSplittingComponent = ({ text }) => (
  <CodeSplittingButton>{text}</CodeSplittingButton>
)

CodeSplittingComponent.propTypes = {
  text: PropTypes.string,
}

export default CodeSplittingComponent
