import React, { PureComponent, ComponentClass } from 'react'
import * as historyLib from 'history'
import * as R from 'ramda'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string'

import { getDisplayName } from 'lib/utils/hoc'

export const navigationParamSelector = (param: string, fallback = null) => (
  _: any,
  props?: object,
) => R.pathOr(fallback, ['match', 'params', param], props)

export const withNavigationProps = (WrappedComponent: ComponentClass) => {
  class MapNavigationParams extends PureComponent<RouteComponentProps> {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...R.pathOr({}, ['match', 'params'], this.props)}
          {...queryString.parse(
            R.pathOr('', ['location', 'search'], this.props),
          )}
        />
      )
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    ;(MapNavigationParams as any).displayName = getDisplayName(
      'MapNavigationParams',
      WrappedComponent,
    )
  }

  return withRouter(MapNavigationParams)
}

export const history = historyLib.createBrowserHistory()

export const goBack = (n = 1) => history.go(0 - n)

export const navigate = (route: string, state = {}) =>
  history.push(route, state)

export const replace = (route: string, state = {}) =>
  history.replace(route, state)
