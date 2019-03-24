import { mergeOrReplaceEntities } from 'lib/records/workflows/entities'
import modules from 'lib/records/modules'
import { getRequest } from 'lib/api/api'

export const getRecord = async (record, id = null, requestParams = null) => {
  const recordModule = modules[record]

  const response = await getRequest(recordModule.api.get(id, requestParams))
  if (response.success) {
    const { data } = response
    mergeOrReplaceEntities(true, recordModule, data)
  }

  return response
}
