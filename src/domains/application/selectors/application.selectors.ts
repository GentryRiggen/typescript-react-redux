import * as R from 'ramda'
import { createSelector } from 'reselect'

import { Application } from 'domains/application/ducks/application.reducer'
import { RootState } from 'lib/store/rootReducer'

export const applicationSelector = (state: RootState): Application =>
  R.prop('application', state)

export const applicationPropSelector = (prop: string): any =>
  createSelector(
    applicationSelector,
    R.prop(prop)
  )
export const applicationInitializedSelector = () =>
  applicationPropSelector('initialized')
