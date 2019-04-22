import React from 'react'
import Icon, { IIconProps } from 'lib/components/Icon'

interface IProps {
  isFab?: boolean
}

export default (props: IIconProps & IProps) => {
  const { isFab, children, ...rest } = props
  return (
    <Icon {...rest} className={`${isFab ? 'fab' : 'fas'} fa-${children}`} />
  )
}
