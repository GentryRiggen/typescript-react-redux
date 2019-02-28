import styled from 'styled-components'
import * as SS from 'styled-system'

import { DefaultProps } from 'lib/components/utils'

export default styled.div<DefaultProps>`
  box-sizing: border-box;
  ${SS.space};
  ${SS.color};
  ${SS.fontSize};
  ${SS.borders};
  ${SS.borderColor};
  ${SS.borderRadius};
  ${SS.display};
  ${SS.width};
  ${SS.maxWidth};
  ${SS.minWidth};
  ${SS.height};
  ${SS.maxHeight};
  ${SS.minHeight};
  ${SS.alignItems};
  ${SS.alignContent};
  ${SS.justifyContent};
  ${SS.flexWrap};
  ${SS.flexDirection};
  ${SS.flex};
  ${SS.flexBasis};
  ${SS.justifySelf};
  ${SS.alignSelf};
  ${SS.order};
  ${SS.position};
  ${SS.zIndex};
  ${SS.top};
  ${SS.right};
  ${SS.bottom};
  ${SS.left};
`
