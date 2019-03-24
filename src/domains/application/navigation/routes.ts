import * as R from 'ramda'
import { hasValue } from 'lib/utils'

export const LOGIN_ROUTE = '/login'
export const DASHBOARD_ROUTE = '/home'

export const getRoute = (
  baseRoute: string,
  id: string | number,
  parts: string[] | string = '',
  queryString: object = {},
) => {
  let base = `${baseRoute}/${id}`
  if (hasValue(parts)) {
    base = `${base}${
      Array.isArray(parts) ? `/${parts.join('/')}` : `/${parts}`
    }`
  }
  if (hasValue(queryString)) {
    const qs = R.compose(
      R.join('&'),
      R.values,
      R.mapObjIndexed((value, key) => `${key}=${value}`),
    )(queryString)
    base = `${base}?${qs}`
  }
  return base
}
