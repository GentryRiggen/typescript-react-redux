import * as SS from 'styled-system'

import BaseStyledComponent, { styled } from 'lib/components/BaseStyledComponent'

export interface ITextStyles {
  title: object
  subtitle: object
  regular: object
  caption: object
}

export const textStyles: ITextStyles = {
  title: {
    fontSize: '24px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '700',
  },
  regular: {
    fontSize: '14px',
    fontWeight: '400',
  },
  caption: {
    fontSize: '11px',
    fontWeight: '400',
  },
}

const variant = SS.variant({ key: 'textStyles' })

export default BaseStyledComponent({
  styledTag: styled.p,
  displayName: 'Text',
  variants: [variant],
  defaultProps: { color: 'text', variant: 'regular' },
})
