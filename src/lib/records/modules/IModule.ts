import * as normalizr from 'normalizr'

export interface IModuleApi {
  create: () => string
  get: (id: string) => string
  getList: (params?: object) => string
  update: (id: string) => string
  delete: (id: string) => string
}

export interface IModule {
  record: string
  schema: normalizr.schema.Entity
  api: IModuleApi
}
