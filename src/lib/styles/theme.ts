import colors, { IColors } from 'lib/styles/colors'
import { IFlexibleStyles } from 'lib/components/flexibleStyles'
import { textStyles } from 'lib/components/Text'
import { buttonStyles } from 'lib/components/Button'
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
  buttonStyles,
  colors,
  elevationStyles,
  flexibleStyles,
  textStyles,
  viewHoverStyles,
  viewVariantStyles,
}
