import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const CodeSplittingComponent = ({ lazyText }) => (
  <div>
    <button className="CodeSplittingComponent-button">{lazyText}</button>
  </div>
)

CodeSplittingComponent.propTypes = {
  lazyTest: PropTypes.string
}

export default CodeSplittingComponent
