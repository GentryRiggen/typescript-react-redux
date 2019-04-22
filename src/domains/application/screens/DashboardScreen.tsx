import React, { PureComponent } from 'react'
import View from 'lib/components/View'
import Text from 'lib/components/Text'
import { logout } from 'domains/authentication/workflows/logout'
import Button from 'lib/components/Button'

export default class DashboardScreen extends PureComponent {
  render() {
    return (
      <View bg="primary" p={3} flexible="row-space-between">
        <Text color="white" variant="title">
          Books
        </Text>
        <Button variant="secondary" onClick={logout}>
          Log out
        </Button>
      </View>
    )
  }
}
