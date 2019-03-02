import { compose, createStore } from 'redux'
import { StateType } from 'typesafe-actions'

import rootReducer from 'lib/store/rootReducer'

const composeEnhancers: any =
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const store = createStore(rootReducer, undefined, composeEnhancers())

export type Store = StateType<typeof store>

export default store
