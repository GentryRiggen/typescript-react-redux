import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Location } from 'history'
import View from 'lib/components/View'
import * as routes from 'domains/application/navigation/routes'
import DashboardScreen from 'domains/application/screens/DashboardScreen'

interface IProps {
  location: Location
}

export default class MainRouter extends Component<IProps> {
  componentDidUpdate(prevProps: IProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <View data-test="screen-container">
        <Switch>
          <Route path={routes.DASHBOARD_ROUTE} component={DashboardScreen} />
          <Redirect to={routes.DASHBOARD_ROUTE} />
        </Switch>
      </View>
    )
  }
}
