import { normalize } from 'normalizr'

import { IModule } from 'lib/records/modules/IModule'
import { mergeEntities, replaceEntities } from 'lib/store/entities'
import { hasValue } from 'lib/utils'
import store from 'lib/store/store'

export const mergeOrReplaceEntities = (
  merge: boolean,
  module: IModule,
  values: any | any[] = [],
  isArray = false,
) => {
  const { schema } = module
  if (!schema || !hasValue(values)) {
    return values
  }
  const normalizrSchema = isArray ? [schema] : schema
  const { entities, result } = normalize(values, normalizrSchema)

  if (merge) {
    store.dispatch(mergeEntities(entities))
  } else {
    store.dispatch(replaceEntities(entities))
  }

  return result
}
