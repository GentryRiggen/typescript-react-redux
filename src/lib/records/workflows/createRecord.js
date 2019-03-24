import * as R from 'ramda'

import store from 'lib/store'
import { postRequest } from 'lib/api/api'
import { mergeRelatedRecordItems } from 'lib/records/ducks/relatedRecords'
import { mergeRecordItems } from 'lib/records/ducks/records'
import { mergeOrReplaceEntities } from 'lib/records/workflows/entities'
import modules from 'lib/records/modules'
import { hasValue } from 'lib/utils/index'

const prepareCreateData = ({ responseDataKey }, data) => {
  if (!responseDataKey) {
    return data
  }

  return { [responseDataKey]: data }
}

export const createRecord = async (
  record,
  data = {},
  parentRecordId = false,
) => {
  const recordModule = modules[record]
  const response = await postRequest(
    recordModule.api.create(data),
    R.pathOr(
      prepareCreateData(recordModule, data),
      ['api', 'prepareCreateData'],
      recordModule,
    )(data),
  )
  if (response.success && hasValue(response.data)) {
    const items = mergeOrReplaceEntities(true, recordModule, response.data)
    if (parentRecordId) {
      store.dispatch(
        mergeRelatedRecordItems(recordModule.record, items, parentRecordId),
      )
    } else {
      store.dispatch(mergeRecordItems(recordModule.record, items))
    }
  }

  return response
}
