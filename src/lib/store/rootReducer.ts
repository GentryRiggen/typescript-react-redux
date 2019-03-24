import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'

import applicationReducer from 'domains/application/ducks/application.reducer'
import { reducer as entities } from 'lib/store/entities'

const rootReducer = combineReducers({
  application: applicationReducer,
  entities,
})

export type RootState = StateType<typeof rootReducer>

export default rootReducer
