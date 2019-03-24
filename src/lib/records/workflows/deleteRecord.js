import modules from 'lib/records/modules'
import { deleteRequest } from 'lib/api/api'

export const deleteRecord = async (record, id = null, requestParams = null) => {
  const recordModule = modules[record]

  return await deleteRequest(recordModule.api.delete(id, requestParams))
}
