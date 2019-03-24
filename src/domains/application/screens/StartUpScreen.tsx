import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { applicationInitializedSelector } from 'domains/application/selectors/application.selectors'
import { RootState } from 'lib/store/rootReducer'
import initialize from 'domains/application/workflows/initialize'
import AppScreen from 'domains/application/screens/AppScreen'
import AppInitializingScreen from 'domains/application/screens/AppInitializingScreen'

interface IStateProps {
  initialized: boolean
}
const stateMap = createStructuredSelector<RootState, IStateProps>({
  initialized: applicationInitializedSelector(),
})

export class StartUpScreen extends PureComponent<IStateProps> {
  componentDidMount() {
    initialize()
  }

  public render() {
    if (!this.props.initialized) {
      return <AppInitializingScreen />
    }

    return <AppScreen />
  }
}

export default connect<IStateProps, {}, {}, RootState>(stateMap)(StartUpScreen)
