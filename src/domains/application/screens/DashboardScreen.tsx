import React, { PureComponent } from 'react'
import View from 'lib/components/View'
import Text from 'lib/components/Text'
import { logout } from 'domains/authentication/workflows/logout'

export default class DashboardScreen extends PureComponent {
  render() {
    return (
      <View bg="primary" p={3} flexible="row-space-between">
        <Text color="white" variant="title">
          Books
        </Text>
        <View bg="white" p={3} onClick={logout} hover="clickable">
          <Text color="primary" fontWeight={700}>
            Log out
          </Text>
        </View>
      </View>
    )
  }
}
