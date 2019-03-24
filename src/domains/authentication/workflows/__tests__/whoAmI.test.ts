import { whoAmI } from 'domains/authentication/workflows/whoAmI'
import { mergeOrReplaceEntities } from 'lib/records/workflows/entities'
import { setApplicationProperties } from 'domains/application/ducks/application.actions'
import { getRequest } from 'lib/api/api'
import users from 'lib/records/modules/users'

jest.mock('lib/store/store')
jest.mock('lib/api/api', () => ({
  getRequest: jest
    .fn()
    .mockResolvedValueOnce({ success: false })
    .mockResolvedValueOnce({ success: true, data: { id: 1 } }),
}))
jest.mock('lib/records/workflows/entities', () => ({
  mergeOrReplaceEntities: jest.fn().mockReturnValue(1),
}))
jest.mock('domains/application/ducks/application.actions')

describe('#whoAmI', () => {
  describe('when the me request fails', () => {
    it('should not set me in state', async () => {
      await whoAmI()
      expect(getRequest).toHaveBeenCalledWith({ url: 'me' })
      expect(mergeOrReplaceEntities).not.toHaveBeenCalled()
      expect(setApplicationProperties).not.toHaveBeenCalled()
    })
  })
  describe('when the me request succeeds', () => {
    it('should set me in state', async () => {
      await whoAmI()
      expect(getRequest).toHaveBeenCalledWith({ url: 'me' })
      expect(mergeOrReplaceEntities).toHaveBeenCalledWith(
        false,
        users,
        { id: 1 },
        false,
      )
      expect(setApplicationProperties).toHaveBeenCalledWith({ me: 1 })
    })
  })
})
