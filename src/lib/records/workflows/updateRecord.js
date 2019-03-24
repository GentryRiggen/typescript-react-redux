import * as R from 'ramda'

import { mergeOrReplaceEntities } from 'lib/records/workflows/entities'
import modules from 'lib/records/modules'
import { putRequest } from 'lib/api/api'

export const updateRecord = async (record, id = null, requestParams = null) => {
  const recordModule = modules[record]

  const response = await putRequest(
    recordModule.api.update(id, requestParams),
    R.pathOr(R.identity, ['api', 'prepareUpdateData'], recordModule)(
      requestParams,
    ),
  )
  if (response.success) {
    const { data } = response
    mergeOrReplaceEntities(true, recordModule, data)
  }

  return response
}
