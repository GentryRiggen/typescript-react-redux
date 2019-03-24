import React, { PureComponent } from 'react'

import View from 'lib/components/View'
import Image from 'lib/components/Image'

export default class AppInitializingScreen extends PureComponent {
  render() {
    return (
      <View flexible="column-center" bg="primary" width="100vw" height="100vh">
        <Image src="images/bookLover.svg" width="90%" height="auto" />
      </View>
    )
  }
}
