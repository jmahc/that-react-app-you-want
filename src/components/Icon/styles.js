import styled, { keyframes } from 'react-emotion'

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const IconLogo = styled('img')`
  animation: ${logoSpin} infinite 20s linear;
  height: 80px;
`
