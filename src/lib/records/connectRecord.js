import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNavigationProps } from 'lib/utils/navigation'
import { entityByIdSelector } from 'lib/records/selectors/entities'
import { getDisplayName } from 'lib/utils/hoc'

export default (record, getId = 'id', prop = 'entity') => WrappedComponent => {
  const stateMap = createStructuredSelector({
    [prop]: entityByIdSelector(record, getId),
  })
  class ConnectRecord extends PureComponent {
    static propTypes = {
      [prop]: PropTypes.object,
    }

    static defaultProps = {
      [prop]: null,
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  ConnectRecord.displayName = getDisplayName('connectRecord', WrappedComponent)
  return withNavigationProps(connect(stateMap)(ConnectRecord))
}
