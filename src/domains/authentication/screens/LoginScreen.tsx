import React, { PureComponent } from 'react'
import { GoogleLogin } from 'react-google-login'

import View from 'lib/components/View'
import Text from 'lib/components/Text'
import { httpRequest, setTokens } from 'lib/api/api'
import { login } from 'domains/authentication/workflows/login'

export default class AppScreen extends PureComponent {
  state = {
    tokens: null,
  }

  onGoogleFailure = () => alert('Failed Google Auth')

  onGoogleResponse = async ({ tokenId }: any) => {
    const success = await login(tokenId)
    if (!success) {
      alert('failed to login with google')
    }
  }

  renderLoginWithGoogle = (props?: { onClick: () => void }) => (
    <Text variant="subtitle" onClick={props ? props.onClick : () => null}>
      Login with Google
    </Text>
  )

  render() {
    return (
      <View flexible="column-center" flex={1} height="100vh" width="100vw">
        <View
          variant="paper"
          hover="clickable"
          flexible="column-center"
          p={3}
          width={250}
        >
          <Text variant="title" mb={4}>
            Login
          </Text>

          <GoogleLogin
            clientId="631226032466-pg6je4dkvlt95a80bbukehkhkoqs6fgc.apps.googleusercontent.com"
            render={this.renderLoginWithGoogle}
            onSuccess={this.onGoogleResponse}
            onFailure={this.onGoogleFailure}
          />
        </View>
      </View>
    )
  }
}
