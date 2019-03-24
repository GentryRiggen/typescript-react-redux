import * as R from 'ramda'

export const MERGE_RECORD_CUSTOM_PROPERTIES =
  '@@records/MERGE_RECORD_CUSTOM_PROPERTIES'
export const UPDATE_RECORD_CUSTOM_PROPERTY =
  '@@records/UPDATE_RECORD_CUSTOM_PROPERTY'
export const SET_RECORD_PROPERTIES = '@@records/SET_RECORD_PROPERTIES'
export const UPDATE_RECORD_PROPERTY = '@@records/UPDATE_RECORD_PROPERTY'
export const REPLACE_RECORD_ITEMS = '@@records/REPLACE_RECORD_ITEMS'
export const MERGE_RECORD_ITEMS = '@@records/MERGE_RECORD_ITEMS'
export const APPEND_RECORD_ITEM = '@@records/APPEND_RECORD_ITEM'
export const PREPEND_RECORD_ITEM = '@@records/PREPEND_RECORD_ITEM'
export const DELETE_RECORD_ITEM = '@@records/DELETE_RECORD_ITEM'

export const defaultRecordState = {
  status: null,
  loading: true,
  loadingNext: false,
  refreshing: false,
  items: [],
  paging: {},
  customProperties: {},
}

export const updateRecordCustomProperty = (record, path, updater) => ({
  type: UPDATE_RECORD_CUSTOM_PROPERTY,
  payload: {
    record,
    path,
    updater,
  },
})

export const mergeRecordCustomProperties = (record, customProperties) => ({
  type: MERGE_RECORD_CUSTOM_PROPERTIES,
  payload: {
    record,
    customProperties,
  },
})

export const setRecordProperties = (record, properties) => ({
  type: SET_RECORD_PROPERTIES,
  payload: {
    record,
    properties,
  },
})

export const updateRecordProperty = (record, path, updater) => ({
  type: UPDATE_RECORD_PROPERTY,
  payload: {
    record,
    path,
    updater,
  },
})

export const replaceRecordItems = (record, items) => ({
  type: REPLACE_RECORD_ITEMS,
  payload: {
    record,
    items,
  },
})

export const mergeRecordItems = (record, items) => ({
  type: MERGE_RECORD_ITEMS,
  payload: {
    record,
    items,
  },
})

export const appendRecordItem = (record, item) => ({
  type: APPEND_RECORD_ITEM,
  payload: {
    record,
    item,
  },
})

export const prependRecordItem = (record, item) => ({
  type: PREPEND_RECORD_ITEM,
  payload: {
    record,
    item,
  },
})

export const deleteRecordItem = (record, item) => ({
  type: DELETE_RECORD_ITEM,
  payload: {
    record,
    item,
  },
})

const withDefaultState = R.mergeDeepRight(defaultRecordState)

const actionTypeUpdater = {
  [UPDATE_RECORD_CUSTOM_PROPERTY]: (state, { path, updater }) =>
    R.over(R.lensPath(R.prepend('customProperties', path)), updater, state),
  [MERGE_RECORD_CUSTOM_PROPERTIES]: (state, { customProperties }) =>
    R.evolve(
      {
        customProperties: R.mergeDeepLeft(customProperties),
      },
      state,
    ),
  [SET_RECORD_PROPERTIES]: (state, { properties }) =>
    R.mergeDeepRight(state, properties),
  [UPDATE_RECORD_PROPERTY]: (state, { updater, path }) =>
    R.over(R.lensPath(path), updater, state),
  [REPLACE_RECORD_ITEMS]: (state, { items }) => R.assoc('items', items, state),
  [MERGE_RECORD_ITEMS]: (state, { items }) =>
    R.evolve(
      { items: R.is(Array, items) ? R.flip(R.concat)(items) : R.append(items) },
      state,
    ),
  [APPEND_RECORD_ITEM]: (state, { item }) =>
    R.evolve(
      {
        items: R.append(item),
      },
      state,
    ),
  [PREPEND_RECORD_ITEM]: (state, { item }) =>
    R.evolve(
      {
        items: R.prepend(item),
      },
      state,
    ),
  [DELETE_RECORD_ITEM]: (state, { item }) =>
    R.evolve(
      {
        items: R.without([item]),
      },
      state,
    ),
}

export const recordReducer = (state = defaultRecordState, action) => {
  const updater = actionTypeUpdater[action.type]

  return updater ? withDefaultState(updater(state, action.payload)) : state
}

export const reducer = (state = {}, action) => {
  const record = R.pathOr('', ['payload', 'record'], action)
  const recordState = R.propOr(defaultRecordState, record, state)

  return R.has(action.type, actionTypeUpdater)
    ? R.assoc(record, recordReducer(recordState, action), state)
    : state
}
