import React, { PureComponent } from 'react'

import View from 'lib/components/View'
import Text from 'lib/components/Text'

export default class App extends PureComponent {
  render() {
    return (
      <View
        variant="paper"
        hover="clickable"
        m={4}
        flex={1}
        flexible="row-space-between"
      >
        <Text color="primary" variant="title">
          Title (Primary)
        </Text>
        <Text color="secondary" variant="subtitle">
          SubTitle (secondary)
        </Text>
        <Text>Regular</Text>
      </View>
    )
  }
}
