import store from 'lib/store/store'
import { setApplicationProperties } from 'domains/application/ducks/application.actions'

export default (): void => {
  setTimeout(() => {
    store.dispatch(setApplicationProperties({ initialized: true }))
  }, 1000)
}
