import * as R from 'ramda'

import store from 'lib/store'
import { getRequest } from 'lib/api/api'
import {
  mergeRelatedRecordItems,
  setRelatedRecordProperties,
  replaceRelatedRecordItems,
} from 'lib/records/ducks/relatedRecords'
import {
  mergeRecordItems,
  setRecordProperties,
  replaceRecordItems,
} from 'lib/records/ducks/records'
import { mergeOrReplaceEntities } from 'lib/records/workflows/entities'
import modules from 'lib/records/modules'
import { convertToInt } from 'lib/utils'

const getPagingValue = (headers, field) => convertToInt(R.prop(field, headers))

export const setPaging = (
  record,
  setProperties,
  response,
  parentRecordId = false,
) => {
  const headers = R.propOr({}, 'headers', response)

  const paging = {
    nextPage: getPagingValue(headers, 'x-next-page'),
    page: getPagingValue(headers, 'x-page'),
    total: getPagingValue(headers, 'x-total'),
    totalPages: getPagingValue(headers, 'x-total-pages'),
  }

  store.dispatch(setProperties(record, { paging }, parentRecordId))
}

const getLoadingField = page => {
  if (!page) {
    return 'loading'
  }
  if (page === 1) {
    return 'refreshing'
  }

  return 'loadingNext'
}

const getActions = hasParentRecordId =>
  hasParentRecordId
    ? {
        setProperties: setRelatedRecordProperties,
        mergeItems: mergeRelatedRecordItems,
        replaceItems: replaceRelatedRecordItems,
      }
    : {
        setProperties: setRecordProperties,
        mergeItems: mergeRecordItems,
        replaceItems: replaceRecordItems,
      }

export const getRecords = async (
  record,
  page = null,
  requestParams = {},
  parentRecordId = null,
) => {
  const recordModule = modules[record]
  const loadingField = getLoadingField(page)
  const { setProperties, mergeItems, replaceItems } = getActions(parentRecordId)

  store.dispatch(
    setProperties(record, { [loadingField]: true }, parentRecordId),
  )

  const response = await getRequest(
    recordModule.api.getList(requestParams, parentRecordId, page),
  )
  store.dispatch(
    setProperties(record, { status: response.status }, parentRecordId),
  )
  if (response.success) {
    const data = R.pathOr(
      [],
      ['data', R.propOr(record, 'responseDataKey', recordModule)],
      response,
    )
    const items = mergeOrReplaceEntities(true, recordModule, data, true)

    setPaging(record, setProperties, response, parentRecordId)
    if (page > 1) {
      store.dispatch(mergeItems(record, items, parentRecordId))
    } else {
      store.dispatch(replaceItems(record, items, parentRecordId))
    }
  }

  store.dispatch(
    setProperties(record, { [loadingField]: false }, parentRecordId),
  )

  return response
}
