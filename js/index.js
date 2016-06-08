import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import {Provider} from 'react-redux'
import App from './containers/app'
import configureStore from './stores/configure_store'
import networkLayer from './relay/network_layer'

document.addEventListener('DOMContentLoaded', function(){

  // let state = {
  //   size: 128,
  //   userId: 25,
  // }

  // let state1 = {...state, size: 64}
  // console.log(state, state1)

  Relay.injectNetworkLayer(networkLayer)

  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
