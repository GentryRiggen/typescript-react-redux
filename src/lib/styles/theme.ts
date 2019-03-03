import colors, { IColors } from 'lib/styles/colors'
import { IFlexibleStyles, flexibleStyles } from 'lib/components/flexibleStyles'
import { ITextStyles, textStyles } from 'lib/components/Text'
import {
  IViewStyles,
  viewStyles,
  IViewHoverStyles,
  viewHoverStyles,
} from 'lib/components/View'

export interface ITheme {
  colors: IColors
  flexibleStyles: IFlexibleStyles
  textStyles: ITextStyles
  viewStyles: IViewStyles
  viewHoverStyles: IViewHoverStyles
}

export default {
  colors,
  flexibleStyles,
  textStyles,
  viewStyles,
  viewHoverStyles,
}
