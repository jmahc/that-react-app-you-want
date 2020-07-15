import React, { useState, Fragment } from 'react'

import './styles.css'

export default function Button() {
  const [buttonClickCount, setButtonClickCount] = useState(0)

  const handleOnClick = () => setButtonClickCount(buttonClickCount + 1)

  return (
    <Fragment>
      <div>
        <button className="Button-big" onClick={() => handleOnClick()}>
          This button has been clicked {buttonClickCount} times!
        </button>
      </div>
    </Fragment>
  )
}
