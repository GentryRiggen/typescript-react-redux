import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'

import * as actions from 'domains/application/ducks/application.actions'
import { SET_APPLICATION_PROPERTIES } from 'domains/application/ducks/application.types'

export type Application = {
  initialized: boolean
}

export type ApplicationState = {
  readonly application: Application
}

export type ApplicationActions = ActionType<typeof actions>

const initialState: Application = {
  initialized: false,
}

export default (state = initialState, action: ApplicationActions) => {
  switch (action.type) {
    case SET_APPLICATION_PROPERTIES:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
