import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import './index.css'
import store from 'lib/store/store'
import theme from 'lib/styles/theme'
import StartUpScreen from 'domains/application/screens/StartUpScreen';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StartUpScreen />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
