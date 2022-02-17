// import React from 'react'
import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import App from './components/App'

const AppContainer = hot(module)(
  () => <App />
)

ReactDOM.render(
    <AppContainer />,
  document.getElementById('root')
)
