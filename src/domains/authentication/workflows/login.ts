import * as R from 'ramda'

import { postRequest, setTokens } from 'lib/api/api'
import { whoAmI } from 'domains/authentication/workflows/whoAmI'
import initialize from 'domains/application/workflows/initialize'
import { history } from 'lib/utils/navigation'
import { DASHBOARD_ROUTE } from 'domains/application/navigation/routes'

export const login = async (tokenId: string) => {
  const response = await postRequest({
    url: 'auth/google',
    data: { tokenId },
  })

  if (response.success) {
    await setTokens(response)
    await whoAmI()
    await initialize()
    const redirectUrl = R.pathOr(
      DASHBOARD_ROUTE,
      ['location', 'state', 'redirectUrl'],
      history,
    )
    history.push(redirectUrl)
  }

  return response.success
}
