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
      <nav className="Header-links">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/private">Private</NavLink>
          </li>
          <li>
            <NavLink to="/not-a-page">Not a page</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
