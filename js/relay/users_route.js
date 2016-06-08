import Relay from 'react-relay'

export default class UsersRoute extends Relay.Route {
  static queries = {
    users: () => Relay.QL`
      query {
        users
      }
    `
  }

  static routeName = 'UsersRoute';
}
