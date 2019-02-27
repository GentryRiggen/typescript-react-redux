import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { applicationInitializedSelector } from 'domains/application/selectors/application.selectors'
import { RootState } from 'lib/store/rootReducer'
import App from 'domains/application/screens/App'
import initialize from 'domains/application/workflows/initialize'

interface IStateProps {
  initialized: boolean
}
const stateMap = createStructuredSelector<RootState, IStateProps>({
  initialized: applicationInitializedSelector(),
})

export class StartUp extends PureComponent<IStateProps> {
  componentDidMount() {
    initialize()
  }

  public render() {
    if (this.props.initialized) {
      return <App />
    }

    return (
      <>
        <img src="images/apple-touch-icon.png" />
        <h1>App Initializing...</h1>
      </>
    )
  }
}

export default connect<IStateProps, {}, {}, RootState>(stateMap)(StartUp)
