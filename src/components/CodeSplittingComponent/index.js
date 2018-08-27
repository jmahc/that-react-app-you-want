import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const CodeSplittingComponent = ({ text }) => (
  <div>
    <button className="CodeSplittingComponent-button">{text}</button>
  </div>
)

CodeSplittingComponent.propTypes = {
  text: PropTypes.string
}

export default CodeSplittingComponent
