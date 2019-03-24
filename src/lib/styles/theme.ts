import colors, { IColors } from 'lib/styles/colors'
import { IFlexibleStyles } from 'lib/components/flexibleStyles'
import { textStyles } from 'lib/components/Text'
import {
  elevationStyles,
  flexibleStyles,
  viewHoverStyles,
  viewVariantStyles,
} from 'lib/components/View'

export interface ITheme {
  colors: IColors
  flexibleStyles: IFlexibleStyles
}

export default {
  colors,
  flexibleStyles,
  textStyles,
  elevationStyles,
  viewVariantStyles,
  viewHoverStyles,
}
