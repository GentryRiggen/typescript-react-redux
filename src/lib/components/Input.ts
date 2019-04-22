import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import * as SS from 'styled-system'
import { IFlexibleProps, flexibleStyle } from 'lib/components/View'

export interface IHtmlInputElementProps
  extends HTMLAttributes<HTMLInputElement> {}
interface IBaseProps
  extends IHtmlInputElementProps,
    SS.AlignContentProps,
    SS.AlignItemsProps,
    SS.AlignSelfProps,
    SS.BgColorProps,
    SS.BorderColorProps,
    SS.BorderProps,
    SS.BorderRadiusProps,
    SS.BordersProps,
    SS.BottomProps,
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
  flexible?: string
  'data-test'?: string
}

const Input = styled.input<IBaseProps & IFlexibleProps>`
  background-color: transparent !important;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid 1px #999;
  padding: 16px;
  box-sizing: border-box;
  width: 100%;

  ${flexibleStyle};

  ${SS.alignContent};
  ${SS.alignItems};
  ${SS.alignSelf};
  ${SS.borderColor};
  ${SS.borderRadius};
  ${SS.borders};
  ${SS.bottom};
  ${SS.color};
  ${SS.display};
  ${SS.flexBasis};
  ${SS.flexDirection};
  ${SS.flexWrap};
  ${SS.flex};
  ${SS.fontSize};
  ${SS.fontWeight};
  ${SS.gridAutoFlow};
  ${SS.gridColumnGap};
  ${SS.gridRowGap};
  ${SS.gridTemplateColumns};
  ${SS.gridTemplateRows}
  ${SS.height};
  ${SS.justifyContent};
  ${SS.justifySelf};
  ${SS.left};
  ${SS.lineHeight};
  ${SS.maxHeight};
  ${SS.maxWidth};
  ${SS.minHeight};
  ${SS.minWidth};
  ${SS.order};
  ${SS.overflow};
  ${SS.position};
  ${SS.right};
  ${SS.space};
  ${SS.top};
  ${SS.verticalAlign};
  ${SS.width};
  ${SS.zIndex};
`

Input.displayName = 'Input'

export default Input
