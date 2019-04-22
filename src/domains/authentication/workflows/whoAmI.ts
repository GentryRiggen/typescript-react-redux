import gql from 'graphql-tag'
import { mergeOrReplaceEntities } from 'lib/records/workflows/entities'
import users from 'lib/records/modules/users'
import store from 'lib/store/store'
import { setApplicationProperties } from 'domains/application/ducks/application.actions'
import { runQuery } from 'lib/api/runQuery'

export const whoAmI = async () => {
  const meResponse = await runQuery(
    'me',
    gql`
      query {
        me {
          id
          firstName
          lastName
        }
      }
    `,
  )

  if (meResponse.success) {
    const meId = mergeOrReplaceEntities(false, users, meResponse.data)
    store.dispatch(setApplicationProperties({ me: meId }))
  }
}
