import * as SS from 'styled-system'

const displayFlex = {
  display: 'flex',
}
const flexCenter = {
  alignItems: 'center',
  justifyContent: 'center',
}

export interface IFlexibleStyles {
  column: object
  'column-center': object
  'column-h-start': object
  'column-h-end': object
  'column-h-center': object
  'column-v-end': object
  row: object
  'row-wrap': object
  'row-center': object
  'row-v-center': object
  'row-v-end': object
  'row-h-center': object
  'row-h-end': object
  'row-h-end-wrap': object
  'row-space-between': object
  'row-space-between-wrap': object
  'row-space-around': object
  'row-space-around-wrap': object
}

export const flexibleStyles: IFlexibleStyles = {
  column: {
    ...displayFlex,
    flexDirection: 'column',
  },
  'column-center': {
    ...displayFlex,
    ...flexCenter,
    flexDirection: 'column',
  },
  'column-h-start': {
    ...displayFlex,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  'column-h-end': {
    ...displayFlex,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  'column-h-center': {
    ...displayFlex,
    flexDirection: 'column',
    alignItems: 'center',
  },
  'column-v-end': {
    ...displayFlex,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  row: {
    ...displayFlex,
    flexDirection: 'row',
  },
  'row-wrap': {
    ...displayFlex,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  'row-center': {
    ...displayFlex,
    ...flexCenter,
    flexDirection: 'row',
  },
  'row-v-center': {
    ...displayFlex,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  'row-v-end': {
    ...displayFlex,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  'row-h-center': {
    ...displayFlex,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  'row-h-end': {
    ...displayFlex,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  'row-h-end-wrap': {
    ...displayFlex,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  'row-space-between': {
    ...displayFlex,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  'row-space-between-wrap': {
    ...displayFlex,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  'row-space-around': {
    ...displayFlex,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  'row-space-around-wrap': {
    ...displayFlex,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}

export default SS.variant({
  key: 'flexibleStyles',
  prop: 'flexible',
})
