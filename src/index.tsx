import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import './index.css'
import store from 'lib/store/store'
import theme from 'lib/styles/theme'
import StartUpScreen from 'domains/application/screens/StartUpScreen'
import apollo from 'lib/api/apollo'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <StartUpScreen />
      </ApolloProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
