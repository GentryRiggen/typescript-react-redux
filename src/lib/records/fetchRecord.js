import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { Spinner } from 'lib/components'
import { getRecord } from 'lib/records/workflows/getRecord'
import { getDisplayName } from 'lib/utils/hoc'
import { entityByIdSelector, idSelector } from 'lib/records/selectors/entities'
import { withNavigationProps } from 'lib/utils/navigation'

export default (record, getId = 'id') => WrappedComponent => {
  const stateMap = createStructuredSelector({
    entityId: idSelector(getId),
    entity: entityByIdSelector(record, getId),
  })
  const actionMap = () => ({
    getRecord: id => getRecord(record, id),
  })

  class FetchRecord extends PureComponent {
    static propTypes = {
      id: PropTypes.string.isRequired,
      entityId: PropTypes.any.isRequired,
      entity: PropTypes.any.isRequired,
      getRecord: PropTypes.func.isRequired,
    }

    static defaultProps = {
      entity: null,
    }

    componentDidMount() {
      if (this.props.entityId) {
        this.props.getRecord(this.props.entityId)
      } else {
        alert('ENTITY ID UNKOWN') // eslint-disable-line
      }
    }

    renderLoading() {
      if (!this.props.entity) {
        return <Spinner centered />
      }

      return null
    }

    renderContent() {
      const { entity } = this.props
      if (!entity) {
        return null
      }

      return <WrappedComponent {...this.props} />
    }

    render() {
      return (
        <>
          {this.renderLoading()}
          {this.renderContent()}
        </>
      )
    }
  }

  FetchRecord.displayName = getDisplayName('fetchRecord', WrappedComponent)
  return withNavigationProps(
    connect(
      stateMap,
      actionMap,
    )(FetchRecord),
  )
}
