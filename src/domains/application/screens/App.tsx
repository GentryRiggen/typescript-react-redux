import React, { PureComponent } from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

import View from 'lib/components/View'
import Text from 'lib/components/Text'

const API_URL = process.env.API_URL || 'http://books.gentry.codes:8080'

export default class App extends PureComponent {
  state = {
    tokens: null,
  }

  onGoogleResponse = async ({ tokenId }: any) => {
    const response = await axios.post(`${API_URL}/auth/google`, { tokenId })
    if (response.status === 201) {
      this.setState({ tokens: response.data })
    }
  }

  render() {
    const { tokens } = this.state
    return (
      <View variant="paper" hover="clickable" m={4} flex={1} flexible="column">
        <GoogleLogin
          clientId="631226032466-pg6je4dkvlt95a80bbukehkhkoqs6fgc.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.onGoogleResponse}
          onFailure={this.onGoogleResponse}
        />
        <Text>Tokens: {JSON.stringify(this.state.tokens)}</Text>
      </View>
    )
  }
}
