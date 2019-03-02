import React, { PureComponent } from 'react'

import View from 'lib/components/View'
import Text from 'lib/components/Text'

export default class App extends PureComponent {
  render() {
    return (
      <View bg="blue" m="100px">
        <img src="images/typescript.png" />
        <h1>App Initialized</h1>
        <Text>Hello?</Text>
      </View>
    )
  }
}
