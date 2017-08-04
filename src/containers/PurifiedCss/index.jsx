import React, { PureComponent } from 'react'

import './PurifiedCss.css'

class PurifiedCss extends PureComponent {
  render() {
    return (
      <div>
        <span className="PurifiedCss-woohoo">
          Purify me! I dare ya!!! I promise you need this CSS class :)
        </span>
      </div>
    )
  }
}

export default PurifiedCss
