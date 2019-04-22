import React, { PureComponent } from 'react'
import { CircleSpinner } from 'react-spinners-kit'
import colors from 'lib/styles/colors'

interface IProps {
  size?: number
}

export default class Spinner extends PureComponent<IProps> {
  render() {
    const { size } = this.props

    return <CircleSpinner color={colors.primary} size={size || 24} />
  }
}
