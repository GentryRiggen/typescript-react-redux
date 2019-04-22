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

export interface IHtmlButtonElementProps
  extends HTMLAttributes<HTMLButtonElement> {}
interface IBaseProps
  extends IHtmlButtonElementProps,
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
  variant?: string
  wordBreak?: string
  userSelect?: string
}

type IVariantProps = {
  variant?: 'primary' | 'secondary'
}

type IProps = IVariantProps & IBaseProps

// prettier-ignore
const Button = styled.button<IProps>`
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2),
    0px 2px 2px 0px rgba(0,0,0,0.14),
    0px 3px 1px -2px rgba(0,0,0,0.12);
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  padding: 6px 16px;
  text-align: center;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
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

Button.displayName = 'Button'
Button.defaultProps = { variant: 'primary' }

export default Button
