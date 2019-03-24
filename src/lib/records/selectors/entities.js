import * as R from 'ramda'
import { createSelector } from 'reselect'

export const idSelector = (getId = 'id') => (state, props) => {
  if (R.is(Number, getId)) {
    return getId
  }

  if (R.is(String, getId)) {
    return R.prop(getId, props)
  }

  if (R.is(Array, getId)) {
    return R.path(getId, props)
  }

  return getId(state, props)
}

export const entitiesSelector = R.propOr({}, 'entities')

export const entityListSelector = entityKey =>
  createSelector(
    entitiesSelector,
    R.propOr({}, entityKey),
  )

export const entityByIdSelector = R.curryN(
  2,
  (entityKey, getId, fallback = null) =>
    createSelector(
      idSelector(getId),
      entityListSelector(entityKey),
      R.propOr(fallback),
    ),
)
