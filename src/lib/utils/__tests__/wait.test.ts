import { waitFor } from 'lib/utils/wait'

describe('#waitFor', () => {
  describe('when timeout is 0', () => {
    it('should resolve', async () => {
      await waitFor(0)
      expect(true).toBe(true)
    })
  })
})
