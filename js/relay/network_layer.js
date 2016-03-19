import {graphql} from 'graphql'
import schema from '../data/schema'

const networkLayer = {

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
            queryRequest.resolve({response: result.data})
          }
        })
      }
    ))
  },

  supports(...options) {
    // ...
  },
}

export default networkLayer
