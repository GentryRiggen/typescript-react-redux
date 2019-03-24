import * as R from 'ramda'

export const REMOVE_ENTITY = '@@entities/REMOVE_ENTITY'
export const CLEAR_ENTITIES = '@@entities/CLEAR_ENTITIES'
export const REPLACE_ENTITIES = '@@entities/REPLACE_ENTITIES'
export const MERGE_ENTITIES = '@@entities/MERGE_ENTITIES'
export const UPDATE_ENTITY = '@@entities/UPDATE_ENTITY'
export const REPLACE_ENTITY_PROPERTY = '@@entities/REPLACE_ENTITY_PROPERTY'

export const removeEntity = (entityKey, key) => ({
  type: REMOVE_ENTITY,
  payload: {
    entityKey,
    key,
  },
})

export const clearEntities = entityKey => ({
  type: CLEAR_ENTITIES,
  payload: {
    entityKey,
  },
})

export const replaceEntities = entities => ({
  type: REPLACE_ENTITIES,
  payload: {
    entities,
  },
})

export const mergeEntities = entities => ({
  type: MERGE_ENTITIES,
  payload: {
    entities,
  },
})

export const updateEntityProperty = (path, updater) => ({
  type: UPDATE_ENTITY,
  payload: {
    path,
    updater,
  },
})

export const replaceEntityProperty = (path, property) => ({
  type: REPLACE_ENTITY_PROPERTY,
  payload: {
    path,
    property,
  },
})

const initialState = {}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ENTITY:
      return R.dissocPath([action.payload.entityKey, action.payload.key], state)
    case CLEAR_ENTITIES:
      return R.dissoc(action.payload.entityKey, state)
    case REPLACE_ENTITIES:
      return R.mergeDeepWith(
        (_, newValue) => newValue,
        state,
        action.payload.entities,
      )
    case MERGE_ENTITIES:
      return R.mergeDeepRight(state, action.payload.entities)
    case UPDATE_ENTITY: {
      const { path, updater } = action.payload
      return R.assocPath(path, updater(R.pathOr(null, path, state)), state)
    }
    case REPLACE_ENTITY_PROPERTY: {
      const { path, property } = action.payload
      return R.assocPath(path, property, state)
    }
    default:
      return state
  }
}
