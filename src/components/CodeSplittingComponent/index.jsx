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

export default CodeSplittingComponent
