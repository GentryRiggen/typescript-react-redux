import { HTMLAttributes } from 'react'
import * as SS from 'styled-system'
import * as CSS from 'csstype'
import * as styledComponents from 'styled-components'

import { ITheme } from 'lib/styles/theme'

export interface IHtmlAttributes extends HTMLAttributes<HTMLDivElement> {}

export interface IStyledSystem
  extends IHtmlAttributes,
    SS.AlignContentProps,
    SS.AlignItemsProps,
    SS.AlignSelfProps,
    SS.BgColorProps,
    SS.BorderColorProps,
    SS.BorderProps,
    SS.BorderRadiusProps,
    SS.BottomProps,
    SS.DisplayProps,
    SS.FlexBasisProps,
    SS.FlexDirectionProps,
    SS.FlexProps,
    SS.FlexWrapProps,
    SS.FontSizeProps,
    SS.HeightProps,
    SS.JustifyContentProps,
    SS.JustifySelfProps,
    SS.LeftProps,
    SS.MaxHeightProps,
    SS.MaxWidthProps,
    SS.MinHeightProps,
    SS.MinWidthProps,
    SS.OrderProps,
    SS.PositionProps,
    SS.RightProps,
    SS.SpaceProps,
    SS.TopProps,
    SS.WidthProps,
    SS.ZIndexProps {
  color?: CSS.ColorProperty
  flexible?: string
}

const {
  default: styled,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>

export default styled
