import React from 'react'

// % resolves to `src/shared/`
import logo from '%/assets/svg/logo.svg'

import { IconLogo } from './styles'

const Icon = () => <IconLogo alt="logo" src={logo} />

export default Icon
