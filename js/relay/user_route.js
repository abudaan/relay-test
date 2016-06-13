import Relay from 'react-relay'

export default class UserRoute extends Relay.Route {
  static queries = {
    user: () => Relay.QL`
      query {
        user(id: $id)
      }
    `
  }
  static paramDefinitions = {
    id: {required: true}
  }
  static routeName = 'UserRoute'
}
