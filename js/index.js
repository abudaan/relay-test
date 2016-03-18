import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Relay, {RootContainer} from 'react-relay'
import ProfilePicture from './containers/profile_picture'
import ProfileRoute from './profile_route'
import networkLayer from './relay/network_layer'

document.addEventListener('DOMContentLoaded', function(){

  Relay.injectNetworkLayer(networkLayer)

  ReactDOM.render(
    <RootContainer
      Component={ProfilePicture}
      route={new ProfileRoute({userID: '23'})}
      renderLoading={() => (<div>{'loading...'}</div>)}
      renderFailure={() => (<div>{'error'}</div>)}
    />,
    document.getElementById('app')
  )
})
