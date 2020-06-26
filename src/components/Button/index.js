import React, { Component, useState, useEffect, Fragment } from 'react'

import '@/components/Button/styles.css'

export default function Button() {
  const [buttonClickCount, setButtonClickCount] = useState(0)

  const handleOnClick = () => {
    console.log('handle on clikc')
    setButtonClickCount(buttonClickCount + 1)
  }

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
