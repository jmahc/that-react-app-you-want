import PropTypes from 'prop-types'
import React from 'react'

import './CodeSplittingComponent.css'

const CodeSplittingComponent = props => {
  return (
    <div>
      <button className="CodeSplittingComponent-button">
        {props.lazyText}
      </button>
    </div>
  )
}

CodeSplittingComponent.propTypes = {
  lazyTest: PropTypes.string
}

export default CodeSplittingComponent
