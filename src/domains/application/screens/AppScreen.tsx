import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { history } from 'lib/utils/navigation'
import LoginScreen from 'domains/authentication/screens/LoginScreen'
import { applicationPropSelector } from 'domains/application/selectors/application.selectors'
import { LOGIN_ROUTE } from 'domains/application/navigation/routes'
import MainRouter from 'domains/application/navigation/MainRouter'

interface IPropsFromState {
  me: number
}
const stateMap = createStructuredSelector<any, IPropsFromState>({
  me: applicationPropSelector('me'),
})

export class AppScreen extends Component<IPropsFromState> {
  componentDidMount() {
    if (!this.props.me && this.isNotOnLoginRoute()) {
      history.push('/login', {
        redirectUrl: `${history.location.pathname}${history.location.search}`,
      })
    }
  }

  isNotOnLoginRoute = () => history.location.pathname !== LOGIN_ROUTE

  render() {
    const { me } = this.props
    return (
      <Router history={history}>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route path={LOGIN_ROUTE} component={LoginScreen} />
              {!!me && <Route component={MainRouter} />}
            </Switch>
          )}
        />
      </Router>
    )
  }
}

export default connect(stateMap)(AppScreen)
