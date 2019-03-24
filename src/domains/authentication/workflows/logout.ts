import { history } from 'lib/utils/navigation'
import { LOGIN_ROUTE } from 'domains/application/navigation/routes'
import store from 'lib/store/store'
import { clearAllLocalItems } from 'lib/utils/localStorage'
import { setApplicationProperties } from 'domains/application/ducks/application.actions'

export const logout = async () => {
  history.push(LOGIN_ROUTE)
  await clearAllLocalItems()
  store.dispatch(setApplicationProperties({ me: false }))
}
