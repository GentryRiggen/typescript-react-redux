import store from 'lib/store/store'
import { setApplicationProperties } from 'domains/application/ducks/application.actions'
import { whoAmI } from 'domains/authentication/workflows/whoAmI'
import { waitFor } from 'lib/utils/wait'

export default async () => {
  await waitFor(process.env.NODE_ENV === 'development' ? 500 : 0)
  await whoAmI()
  store.dispatch(setApplicationProperties({ initialized: true }))
}
