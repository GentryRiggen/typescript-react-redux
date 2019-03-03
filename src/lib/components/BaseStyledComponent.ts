import React from 'react'
import * as SS from 'styled-system'
import { HTMLAttributes } from 'react'
import * as CSS from 'csstype'
import * as styledComponents from 'styled-components'

import flexibleStyle from 'lib/components/flexibleStyles'

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

export const {
  default: styled,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>

interface IBaseStyledComponentArgs {
  styledTag: any
  displayName: string
  defaultProps?: object
  styles?: string
  variants?: any[]
}

export default (args: IBaseStyledComponentArgs) => {
  const component = args.styledTag<IStyledSystem>`
  ${args.styles};
  ${args.variants};
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
  ${SS.height};
  ${SS.justifyContent};
  ${SS.justifySelf};
  ${SS.left};
  ${SS.maxHeight};
  ${SS.maxWidth};
  ${SS.minHeight};
  ${SS.minWidth};
  ${SS.order};
  ${SS.position};
  ${SS.right};
  ${SS.space};
  ${SS.top};
  ${SS.width};
  ${SS.zIndex};
`
  component.displayName = args.displayName
  component.defaultProps = args.defaultProps || {}
  return component
}
