import * as SS from 'styled-system'

import BaseStyledComponent, { styled } from 'lib/components/BaseStyledComponent'

export const variant = SS.variant({ key: 'viewStyles' })
export interface IViewStyles {
  screen: object
  paper: object
}
export const viewStyles: IViewStyles = {
  screen: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  paper: {
    border: 'solid white 32px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxShadow: '0 0 24px rgba(0,0,0,0.12)',
    overflow: 'auto',
  },
}

export const hover = SS.variant({
  key: 'viewHoverStyles',
  prop: 'hover',
})
export interface IViewHoverStyles {
  clickable: object
}
export const viewHoverStyles: IViewHoverStyles = {
  clickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}

export default BaseStyledComponent({
  styledTag: styled.div,
  displayName: 'View',
  variants: [variant, hover],
})
