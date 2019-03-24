import * as R from 'ramda'

import * as records from './records'

export const APPEND_RELATED_RECORD_ITEM =
  '@@relatedRecords/APPEND_RELATED_RECORD_ITEM'
export const DELETE_RELATED_RECORD_ITEM =
  '@@relatedRecords/DELETE_RELATED_RECORD_ITEM'
export const MERGE_RELATED_RECORD_ITEMS =
  '@@relatedRecords/MERGE_RELATED_RECORD_ITEMS'
export const PREPEND_RELATED_RECORD_ITEM =
  '@@relatedRecords/PREPEND_RELATED_RECORD_ITEM'
export const REPLACE_RELATED_RECORD_ITEMS =
  '@@relatedRecords/REPLACE_RELATED_RECORD_ITEMS'
export const SET_RELATED_RECORD_PROPERTIES =
  '@@relatedRecords/SET_RELATED_RECORD_PROPERTIES'
export const UPDATE_RELATED_RECORD_PROPERTY =
  '@@relatedRecords/UPDATE_RELATED_RECORD_PROPERTY'
export const MERGE_RELATED_RECORD_CUSTOM_PROPERTIES =
  '@@relatedRecords/MERGE_RELATED_RECORD_CUSTOM_PROPERTIES'
export const UPDATE_RELATED_RECORD_CUSTOM_PROPERTY =
  '@@relatedRecords/UPDATE_RELATED_RECORD_CUSTOM_PROPERTY'

const recordActionMap = {
  [APPEND_RELATED_RECORD_ITEM]: records.APPEND_RECORD_ITEM,
  [DELETE_RELATED_RECORD_ITEM]: records.DELETE_RECORD_ITEM,
  [MERGE_RELATED_RECORD_ITEMS]: records.MERGE_RECORD_ITEMS,
  [PREPEND_RELATED_RECORD_ITEM]: records.PREPEND_RECORD_ITEM,
  [REPLACE_RELATED_RECORD_ITEMS]: records.REPLACE_RECORD_ITEMS,
  [SET_RELATED_RECORD_PROPERTIES]: records.SET_RECORD_PROPERTIES,
  [UPDATE_RELATED_RECORD_PROPERTY]: records.UPDATE_RECORD_PROPERTY,
  [UPDATE_RELATED_RECORD_CUSTOM_PROPERTY]:
    records.UPDATE_RECORD_CUSTOM_PROPERTY,
  [MERGE_RELATED_RECORD_CUSTOM_PROPERTIES]:
    records.MERGE_RECORD_CUSTOM_PROPERTIES,
}

export const mergeRelatedRecordCustomProperties = (
  record,
  customProperties,
  parentRecordId,
) => ({
  type: MERGE_RELATED_RECORD_CUSTOM_PROPERTIES,
  payload: {
    record,
    parentRecordId,
    customProperties,
  },
})

export const updateRelatedRecordCustomProperty = (
  record,
  path,
  updater,
  parentRecordId,
) => ({
  type: UPDATE_RELATED_RECORD_CUSTOM_PROPERTY,
  payload: {
    record,
    parentRecordId,
    path,
    updater,
  },
})

export const setRelatedRecordProperties = (
  record,
  properties,
  parentRecordId,
) => ({
  type: SET_RELATED_RECORD_PROPERTIES,
  payload: {
    record,
    parentRecordId,
    properties,
  },
})

export const updateRelatedRecordProperty = (
  record,
  path,
  updater,
  parentRecordId,
) => ({
  type: UPDATE_RELATED_RECORD_PROPERTY,
  payload: {
    record,
    parentRecordId,
    path,
    updater,
  },
})

export const replaceRelatedRecordItems = (record, items, parentRecordId) => ({
  type: REPLACE_RELATED_RECORD_ITEMS,
  payload: {
    record,
    parentRecordId,
    items,
  },
})

export const mergeRelatedRecordItems = (record, items, parentRecordId) => ({
  type: MERGE_RELATED_RECORD_ITEMS,
  payload: {
    record,
    parentRecordId,
    items,
  },
})

export const appendRelatedRecordItem = (record, item, parentRecordId) => ({
  type: APPEND_RELATED_RECORD_ITEM,
  payload: {
    record,
    parentRecordId,
    item,
  },
})

export const prependRelatedRecordItem = (record, item, parentRecordId) => ({
  type: PREPEND_RELATED_RECORD_ITEM,
  payload: {
    record,
    parentRecordId,
    item,
  },
})

export const deleteRelatedRecordItem = (record, item, parentRecordId) => ({
  type: DELETE_RELATED_RECORD_ITEM,
  payload: {
    record,
    parentRecordId,
    item,
  },
})

export const reducer = (state = {}, action) => {
  const record = R.pathOr('', ['payload', 'record'], action)
  const parentRecordId = R.pathOr('', ['payload', 'parentRecordId'], action)
  const parentAction = R.assoc('type', recordActionMap[action.type], action)
  const recordState = R.pathOr(
    records.defaultRecordState,
    [record, parentRecordId],
    state,
  )

  return R.has(action.type, recordActionMap)
    ? R.assocPath(
        [record, parentRecordId.toString()],
        records.recordReducer(recordState, parentAction),
        state,
      )
    : state
}
