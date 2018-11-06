import * as React from 'react'

import Button from '@/components/Button'
import Icon from '@/components/Icon'

import { AppContainer, AppHeader, AppIntro, AppTitle } from './styles'

export default class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          <Icon />
          <h2 className={AppTitle}>this is that-react-app-you-want.</h2>
        </AppHeader>
        <p className={AppIntro}>
          Run the <code>build</code> command to check out <code>purifycss</code>{' '}
          or click the button for some chunks & lazy loading.
        </p>
        <br />
        <Button />
      </AppContainer>
    )
  }
}
