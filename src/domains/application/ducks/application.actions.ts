import { action } from 'typesafe-actions'
import { SET_APPLICATION_PROPERTIES } from 'domains/application/ducks/application.types'

export const setApplicationProperties = (payload: object) =>
  action(SET_APPLICATION_PROPERTIES, payload)
