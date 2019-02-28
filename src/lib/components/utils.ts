import { HTMLAttributes } from 'react'
import * as SS from 'styled-system'
import * as CSS from 'csstype'

import { BaseProps } from 'lib/components/utils'

export interface BaseProps extends HTMLAttributes<HTMLDivElement> {}

export interface DefaultProps
  extends BaseProps,
    SS.BgColorProps,
    SS.SpaceProps,
    SS.FontSizeProps,
    SS.BorderProps,
    SS.BorderColorProps,
    SS.BorderRadiusProps,
    SS.DisplayProps,
    SS.WidthProps,
    SS.MaxWidthProps,
    SS.MinWidthProps,
    SS.HeightProps,
    SS.MaxHeightProps,
    SS.MinHeightProps,
    SS.AlignItemsProps,
    SS.AlignContentProps,
    SS.JustifyContentProps,
    SS.FlexWrapProps,
    SS.FlexDirectionProps,
    SS.FlexProps,
    SS.FlexBasisProps,
    SS.JustifySelfProps,
    SS.AlignSelfProps,
    SS.OrderProps,
    SS.PositionProps,
    SS.ZIndexProps,
    SS.TopProps,
    SS.LeftProps,
    SS.RightProps,
    SS.BottomProps {
  color?: CSS.ColorProperty
}
