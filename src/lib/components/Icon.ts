import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import * as SS from 'styled-system'
import * as CSS from 'csstype'

import { flexibleStyle } from 'lib/components/View'
import colors from 'lib/styles/colors'

export const buttonStyle = SS.variant({
  key: 'buttonStyles',
})

const raisedStyleDefaults = {
  color: colors.white,
  fontWeight: 700,
  fontSize: '14px',
}
export const buttonStyles = {
  primary: {
    ...raisedStyleDefaults,
    backgroundColor: colors.primary,
  },
  secondary: {
    ...raisedStyleDefaults,
    backgroundColor: colors.secondary,
  },
}

export interface IHtmlIElementProps extends HTMLAttributes<HTMLDivElement> {}
export interface IIconProps
  extends IHtmlIElementProps,
    SS.AlignContentProps,
    SS.AlignItemsProps,
    SS.AlignSelfProps,
    SS.BgColorProps,
    SS.BorderColorProps,
    SS.BorderProps,
    SS.BorderRadiusProps,
    SS.BordersProps,
    SS.BottomProps,
    SS.ColorProps,
    SS.DisplayProps,
    SS.FlexBasisProps,
    SS.FlexDirectionProps,
    SS.FlexProps,
    SS.FlexWrapProps,
    SS.FontSizeProps,
    SS.FontStyleProps,
    SS.FontWeightProps,
    SS.GridAutoFlowProps,
    SS.GridColumnGapProps,
    SS.GridRowGapProps,
    SS.GridTemplatesColumnsProps,
    SS.GridTemplatesRowsProps,
    SS.HeightProps,
    SS.JustifyContentProps,
    SS.JustifySelfProps,
    SS.LeftProps,
    SS.LineHeightProps,
    SS.MaxHeightProps,
    SS.MaxWidthProps,
    SS.MinHeightProps,
    SS.MinWidthProps,
    SS.OrderProps,
    SS.OverflowProps,
    SS.PositionProps,
    SS.RightProps,
    SS.SpaceProps,
    SS.TextAlignProps,
    SS.TopProps,
    SS.VerticalAlignProps,
    SS.WidthProps,
    SS.ZIndexProps {
  color?: CSS.ColorProperty
  flexible?: string
}

// prettier-ignore
const Icon = styled.i<IIconProps>`
  ${flexibleStyle}
  ${buttonStyle}

  ${SS.alignContent}
  ${SS.alignItems}
  ${SS.alignSelf}
  ${SS.bottom}
  ${SS.color}
  ${SS.display}
  ${SS.flexBasis}
  ${SS.flexDirection}
  ${SS.flexWrap}
  ${SS.flex}
  ${SS.fontSize}
  ${SS.fontStyle}
  ${SS.fontWeight}
  ${SS.height}
  ${SS.justifyContent}
  ${SS.justifySelf}
  ${SS.left}
  ${SS.letterSpacing}
  ${SS.lineHeight}
  ${SS.maxHeight}
  ${SS.maxWidth}
  ${SS.minHeight}
  ${SS.minWidth}
  ${SS.order}
  ${SS.position}
  ${SS.right}
  ${SS.space}
  ${SS.textAlign}
  ${SS.top}
  ${SS.verticalAlign}
  ${SS.width}
  ${SS.zIndex}
`

Icon.displayName = 'Icon'

export default Icon
