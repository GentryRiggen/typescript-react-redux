import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import './index.css'
import store from 'lib/store/store'
import StartUp from 'domains/application/screens/StartUp'
import theme from 'lib/styles/theme'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StartUp />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
