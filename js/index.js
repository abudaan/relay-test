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
      // return Promise.all(queryRequests.map(
      //   queryRequest => fetch(...).then(result => {
      //     if (result.errors) {
      //       queryRequest.reject(new Error(...));
      //     } else {
      //       queryRequest.resolve({response: result.data});
      //     }
      //   })
      // ));


      let queryRequest = queryRequests[0]
      let query = queryRequest.getQueryString()
      //console.log(query)
      graphql(schema, query).then(result => {
        console.log(result.data)
        queryRequest.resolve({response: result.data})
      })
    },
    supports(...options) {
      // ...
    },
  };

  Relay.injectNetworkLayer(myNetworkLayer);

  let profileRoute = new ProfileRoute({userID: 23})

  ReactDOM.render(
    <RootContainer
      Component={ProfilePicture}
      route={profileRoute}
    />,
    document.getElementById('app')
  )

})
