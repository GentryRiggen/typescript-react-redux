import * as normalizr from 'normalizr'
import { IModule } from 'lib/records/modules/IModule'

export const USERS_RECORD = 'users'

const users: IModule = {
  record: USERS_RECORD,
  schema: new normalizr.schema.Entity(USERS_RECORD),
  api: {
    create: () => '/users',
    get: id => `/users/${id}`,
    getList: () => 'users',
    update: id => `/users/${id}`,
    delete: id => `/users/${id}`,
  },
}

export default users
