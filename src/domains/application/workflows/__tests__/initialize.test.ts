import initialize from 'domains/application/workflows/initialize'
import { setApplicationProperties } from 'domains/application/ducks/application.actions'
import store from 'lib/store/store'

jest.mock('lib/store/store')

describe('#initialize', () => {
  it('should set initialized to true', async () => {
    await initialize()
    expect(store.dispatch).toHaveBeenCalledWith(
      setApplicationProperties({ initialized: true })
    )
  })
})
