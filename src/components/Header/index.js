import React from 'react'
import { NavLink } from 'react-router-dom'

import Icon from '@/components/Icon'

import './styles.css'

export default function Header() {
  return (
    <div className="Header">
      <Icon />
      <h2>This is that React app that you want</h2>
      <br />
      <ul className="Header-links">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/private">Private</NavLink>
        </li>
        <li>
          <NavLink to="/not-a-page">Not a page</NavLink>
        </li>
      </ul>
    </div>
  )
}
