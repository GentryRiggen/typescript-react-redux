import * as R from 'ramda'
import gql from 'graphql-tag'

import { whoAmI } from 'domains/authentication/workflows/whoAmI'
import initialize from 'domains/application/workflows/initialize'
import { history } from 'lib/utils/navigation'
import { DASHBOARD_ROUTE } from 'domains/application/navigation/routes'
import { setLocalItem } from 'lib/utils/localStorage'
import { TOKENS_STORAGE_KEY } from 'lib/api/apiConstants'
import { runMutation } from 'lib/api/runMutation'

export const login = async (email: string, password: string) => {
  const response = await runMutation(
    'login',
    gql`
      mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    { email, password },
  )
  if (response.success) {
    setLocalItem(TOKENS_STORAGE_KEY, response.data || {})
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
