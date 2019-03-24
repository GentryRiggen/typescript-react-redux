import * as R from 'ramda'
import { createSelector } from 'reselect'

import { ensureArray } from 'lib/utils/array'
import { defaultRecordState } from 'lib/records/ducks/records'
import {
  entityByIdSelector,
  entityListSelector,
} from 'lib/records/selectors/entities'
import { itemPropMatchesQuery } from 'lib/utils'

export const searchItems = (items, query, searcher = 'name') => {
  const filter = R.is(String, searcher)
    ? itemPropMatchesQuery(query, searcher)
    : searcher(query)
  return R.filter(filter, items)
}

export const recordSelector = record =>
  R.pathOr(defaultRecordState, ['records', record])

export const recordPropertyByIdSelector = (
  record,
  propertyPath,
  fallback = null,
  getId = 'id',
) =>
  createSelector(
    entityByIdSelector(record, getId),
    R.pathOr(fallback, ensureArray(propertyPath)),
  )

export const allRecordsSelector = record =>
  createSelector(
    recordSelector(record),
    entityListSelector(record),
    ({ items = [] }, entities) => R.map(id => R.prop(id, entities), items),
  )

export const recordPropertySelector = (record, propertyPath, fallback = null) =>
  createSelector(
    recordSelector(record),
    R.pathOr(fallback, ensureArray(propertyPath)),
  )

export const recordCustomPropertySelector = (
  record,
  propertyPath,
  fallback = null,
) =>
  recordPropertySelector(
    record,
    R.prepend('customProperties', ensureArray(propertyPath)),
    fallback,
  )

// Convenience selectors
export const recordIsLoadingSelector = record =>
  recordPropertySelector(record, 'loading', false)

export const fullRecordsSelector = record =>
  createSelector(
    allRecordsSelector(record),
    recordSelector(record),
    (items, recordState) => R.assoc('items', items, recordState),
  )

export const fullSearchableRecordsSelector = (record, getSearcher = 'name') =>
  createSelector(
    fullRecordsSelector(record),
    recordCustomPropertySelector(record, 'search', ''),
    R.is(String, getSearcher) ? () => getSearcher : getSearcher,
    (recordState, query, searcher) =>
      R.assoc(
        'items',
        searchItems(R.propOr([], 'items', recordState), query, searcher),
        recordState,
      ),
  )
