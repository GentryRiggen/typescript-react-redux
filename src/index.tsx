import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'lib/store/store'
import StartUp from 'domains/application/screens/StartUp'

ReactDOM.render(
  <Provider store={store}>
    <StartUp />
  </Provider>,
  document.getElementById('root')
)
