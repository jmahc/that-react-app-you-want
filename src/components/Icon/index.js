import React from 'react'
// % resolves to `src/shared/`
import logo from '%/assets/logos/logo.svg'

import './styles.css'

const Icon = () => <img src={logo} className="Icon-logo" alt="logo" />

export default Icon
