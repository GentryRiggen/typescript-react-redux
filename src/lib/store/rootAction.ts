import { ActionType } from 'typesafe-actions'

import * as applicationActions from 'domains/application/ducks/application.actions'

const rootAction = {
  application: applicationActions,
}

export default rootAction

export type RootAction = ActionType<typeof rootAction>
