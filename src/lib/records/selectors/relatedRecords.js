import * as R from 'ramda'
import { createSelector } from 'reselect'

import { defaultRecordState } from 'lib/records/ducks/records'
import { idSelector, entityListSelector } from 'lib/records/selectors/entities'
import { ensureArray } from 'lib/utils/array'
import {
  searchItems,
  recordCustomPropertySelector,
  searcherSelector,
} from 'lib/records/selectors/records'

export const relatedRecordSelector = (record, getParentRecordId) =>
  createSelector(
    R.pathOr(defaultRecordState, ['relatedRecords', record]),
    idSelector(getParentRecordId),
    (records, id) => R.propOr(defaultRecordState, id, records),
  )

export const allRelatedRecordsSelector = (record, parentRecordId) =>
  createSelector(
    relatedRecordSelector(record, parentRecordId),
    entityListSelector(record),
    ({ items = [] }, entities) => R.map(id => R.prop(id, entities), items),
  )

export const relatedRecordPropertySelector = (
  record,
  getParentRecordId,
  propertyPath,
  fallback = null,
) =>
  createSelector(
    relatedRecordSelector(record, getParentRecordId),
    R.pathOr(fallback, ensureArray(propertyPath)),
  )

export const relatedRecordCustomPropertySelector = (
  record,
  getParentRecordId,
  propertyPath,
  fallback = null,
) =>
  relatedRecordPropertySelector(
    record,
    getParentRecordId,
    R.prepend('customProperties', ensureArray(propertyPath)),
    fallback,
  )

// Convenience selectors
export const relatedRecordIsLoadingSelector = (record, getParentRecordId) =>
  relatedRecordPropertySelector(record, getParentRecordId, 'loading', false)

export const fullRelatedRecordsSelector = (record, parentRecordId) =>
  createSelector(
    allRelatedRecordsSelector(record, parentRecordId),
    relatedRecordSelector(record, parentRecordId),
    (items, recordState) => R.assoc('items', items, recordState),
  )

export const searchValueSelector = createSelector(
  idSelector('record'),
  idSelector('parentId'),
  R.identity,
  (record, parentRecordId, state) =>
    parentRecordId
      ? relatedRecordCustomPropertySelector(
          record,
          parentRecordId,
          'search',
          '',
        )(state)
      : recordCustomPropertySelector(record, 'search', '')(state),
)

export const fullSearchableRelatedRecordsSelector = (
  record,
  parentRecordId,
  getSearcher = 'name',
) =>
  createSelector(
    fullRelatedRecordsSelector(record, parentRecordId),
    relatedRecordCustomPropertySelector(record, parentRecordId, 'search', ''),
    R.is(String, getSearcher) ? () => getSearcher : getSearcher,
    (recordState, query, searcher) =>
      R.assoc(
        'items',
        searchItems(R.propOr([], 'items', recordState), query, searcher),
        recordState,
      ),
  )
