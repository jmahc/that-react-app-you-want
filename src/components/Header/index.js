import React from 'react'
import { Link } from 'react-router-dom'

import Icon from '@/components/Icon'

import './styles.css'

export default function Header() {
  return (
    <div className="Header">
      <Icon />
      <h2>This is that React app that you want</h2>
      <br />
      <nav className="Header-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/private">Private</Link>
          </li>
          <li>
            <Link to="/not-a-page">Not a page</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
