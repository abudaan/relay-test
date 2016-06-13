import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import {Provider} from 'react-redux'
import App from './containers/app'
import configureStore from './stores/configure_store'
import networkLayer from './relay/network_layer'

document.addEventListener('DOMContentLoaded', function(){

  Relay.injectNetworkLayer(networkLayer)

  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
