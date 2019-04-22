import { ApolloClient } from 'apollo-client'
import fetch from 'unfetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { TOKENS_STORAGE_KEY } from 'lib/api/apiConstants'

const uri = process.env.GRAPHQL_URL || 'http://localhost:4000'
const httpLink = createHttpLink({ uri, fetch })

interface IToken {
  token: string
}

const authLink = setContext((_, { headers }) => {
  const storedToken = localStorage.getItem(TOKENS_STORAGE_KEY)
  if (storedToken) {
    const { token } = JSON.parse(storedToken) as IToken
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  }
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
