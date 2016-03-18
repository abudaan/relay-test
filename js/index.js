import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import schema from './data/schema'
import {graphql} from 'graphql'
import Relay, {RootContainer} from 'react-relay'
import ProfilePicture from './containers/profile_picture'
import ProfileRoute from './profile_route'


document.addEventListener('DOMContentLoaded', function(){
  // let query = '{ user(id: 23){id, name, profilePicture {uri, size}} }'
  // graphql(schema, query).then(result => {
  //   console.log(result);
  // })


  var myNetworkLayer = {
    sendMutation(mutationRequest) {
      // ...
    },
    sendQueries(queryRequests) {
      return Promise.all(queryRequests.map(
        queryRequest => {
          let query = queryRequest.getQueryString()
          console.log(query)
          console.log(queryRequest.getVariables())
          graphql(schema, query).then(result => {
            if(result.errors){
              queryRequest.reject(new Error(result.errors))
            }else{
              //console.log(result.data)
              queryRequest.resolve({response: result.data})
            }
          })
        }
      ))
    },
    supports(...options) {
      // ...
    },
  };

  Relay.injectNetworkLayer(myNetworkLayer);

  let profileRoute = new ProfileRoute({userID: '23'})

  ReactDOM.render(
    <RootContainer
      Component={ProfilePicture}
      route={profileRoute}
      renderLoading={() => (<div>{'loading...'}</div>)}
      renderFailure={() => (<div>{'error'}</div>)}
    />,
    document.getElementById('app')
  )

})
