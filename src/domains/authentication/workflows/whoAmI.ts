import { getRequest } from 'lib/api/api'
import { mergeOrReplaceEntities } from 'lib/records/workflows/entities'
import users from 'lib/records/modules/users'
import store from 'lib/store/store'
import { setApplicationProperties } from 'domains/application/ducks/application.actions'

export const whoAmI = async () => {
  const meResponse = await getRequest({ url: 'me' })

  if (meResponse.success) {
  const meId = mergeOrReplaceEntities(false, users, meResponse.data, false)
    store.dispatch(setApplicationProperties({ me: meId }))
  }
}
