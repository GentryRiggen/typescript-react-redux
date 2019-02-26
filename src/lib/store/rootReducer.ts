import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'

import applicationReducer from 'domains/application/ducks/application.reducer'

const rootReducer = combineReducers({
  application: applicationReducer,
})

export type RootState = StateType<typeof rootReducer>

export default rootReducer
